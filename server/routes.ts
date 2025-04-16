import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import Stripe from "stripe";
import { insertUserSchema, insertSubscriptionSchema, subscribeFormSchema } from "@shared/schema";
import { z } from "zod";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import { sendContactEmail } from "./email";

// Initialize Stripe
if (!process.env.STRIPE_SECRET_KEY) {
  console.warn('Missing STRIPE_SECRET_KEY environment variable. Payments will not work properly.');
}

const stripe = process.env.STRIPE_SECRET_KEY 
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2025-03-31.basil",
    })
  : null;

export async function registerRoutes(app: Express): Promise<Server> {
  // Get newsletters for content preview
  app.get("/api/newsletters", async (req, res) => {
    try {
      const newsletters = await storage.getNewsletters();
      res.json(newsletters);
    } catch (error) {
      console.error("Error fetching newsletters:", error);
      res.status(500).json({ message: "Failed to fetch newsletters" });
    }
  });

  // Get newsletters with access level check
  app.get("/api/newsletters/access/:level", async (req, res) => {
    try {
      const { level } = req.params;
      if (!["basic", "professional", "enterprise"].includes(level)) {
        return res.status(400).json({ message: "Invalid subscription level" });
      }
      
      const newsletters = await storage.getNewslettersBySubscriptionLevel(level);
      res.json(newsletters);
    } catch (error) {
      console.error("Error fetching newsletters by access level:", error);
      res.status(500).json({ message: "Failed to fetch newsletters" });
    }
  });

  // User registration
  app.post("/api/register", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      
      // Check if user with email already exists
      const existingUser = await storage.getUserByEmail(userData.email);
      if (existingUser) {
        return res.status(400).json({ message: "User with this email already exists" });
      }
      
      // Create user
      const newUser = await storage.createUser(userData);
      
      // Don't send password back in response
      const { password, ...userWithoutPassword } = newUser;
      res.status(201).json(userWithoutPassword);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      
      console.error("Error registering user:", error);
      res.status(500).json({ message: "Failed to register user" });
    }
  });

  // Handle subscription form submissions
  app.post("/api/subscribe", async (req, res) => {
    try {
      const formData = subscribeFormSchema.parse(req.body);
      
      // Check if user with email already exists
      let user = await storage.getUserByEmail(formData.email);
      
      if (!user) {
        // Create a new user
        const username = formData.email.split('@')[0] + Math.floor(Math.random() * 1000);
        const password = Math.random().toString(36).slice(-8); // Generate random password
        
        user = await storage.createUser({
          username,
          password,
          email: formData.email,
          name: formData.name
        });
      }
      
      // Create subscription
      const subscription = await storage.createSubscription({
        userId: user.id,
        plan: formData.plan,
        status: "pending",
        paymentMethod: formData.paymentMethod
      });
      
      // Return data needed for payment
      res.status(201).json({
        userId: user.id,
        subscriptionId: subscription.id,
        plan: formData.plan,
        paymentMethod: formData.paymentMethod
      });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      
      console.error("Error processing subscription:", error);
      res.status(500).json({ message: "Failed to process subscription" });
    }
  });

  // Stripe payment intent creation
  app.post("/api/create-payment-intent", async (req, res) => {
    try {
      if (!stripe) {
        return res.status(500).json({ message: "Stripe is not configured" });
      }

      const { plan } = req.body;
      
      // Define amount based on plan
      let amount = 0;
      switch (plan) {
        case "basic":
          amount = 900; // $9.00
          break;
        case "professional":
          amount = 2900; // $29.00
          break;
        case "enterprise":
          amount = 7900; // $79.00
          break;
        default:
          return res.status(400).json({ message: "Invalid plan" });
      }
      
      const paymentIntent = await stripe.paymentIntents.create({
        amount, // Amount in cents
        currency: "usd",
        metadata: {
          plan
        }
      });
      
      res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error: any) {
      console.error("Error creating payment intent:", error);
      res.status(500).json({ 
        message: "Error creating payment intent", 
        error: error.message 
      });
    }
  });

  // Subscription creation after payment
  app.post("/api/subscription/confirm", async (req, res) => {
    try {
      const { userId, subscriptionId, paymentIntentId } = req.body;
      
      // In a real implementation, you would verify the payment with Stripe
      // For now, just update the subscription status
      const subscription = await storage.updateSubscriptionStatus(subscriptionId, "active");
      
      res.json({ 
        success: true, 
        subscription 
      });
    } catch (error) {
      console.error("Error confirming subscription:", error);
      res.status(500).json({ message: "Failed to confirm subscription" });
    }
  });

  // Contact form submission endpoint
  app.post("/api/contact", async (req: Request, res: Response) => {
    try {
      console.log("Contact form submission received:", req.body);
      const { name, email, subject, message } = req.body;
      
      // Validate input
      if (!name || !email || !subject || !message) {
        console.log("Validation failed. Missing fields:", { name, email, subject, message });
        return res.status(400).json({ 
          success: false, 
          message: "All fields are required" 
        });
      }
      
      // Check if environment variables are set
      if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        console.error("Email credentials missing. EMAIL_USER or EMAIL_PASS not set.");
        return res.status(500).json({
          success: false,
          message: "Email service not configured properly. Please contact the administrator."
        });
      }
      
      console.log("Attempting to send email with data:", { name, email, subject });
      // Send email
      const emailSent = await sendContactEmail({ name, email, subject, message });
      
      if (emailSent) {
        console.log("Email sent successfully");
        return res.status(200).json({ 
          success: true, 
          message: "Message sent successfully" 
        });
      } else {
        console.error("Email sending failed");
        return res.status(500).json({ 
          success: false, 
          message: "Failed to send message. Please try again later." 
        });
      }
    } catch (error) {
      console.error("Contact form error:", error);
      return res.status(500).json({ 
        success: false, 
        message: "An unexpected error occurred", 
        error: error instanceof Error ? error.message : String(error)
      });
    }
  });

  // Create HTTP server
  const httpServer = createServer(app);
  return httpServer;
}
