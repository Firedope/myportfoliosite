import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  stripeCustomerId: text("stripe_customer_id"),
  stripeSubscriptionId: text("stripe_subscription_id"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const subscriptions = pgTable("subscriptions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  plan: text("plan").notNull(), // basic, professional, enterprise
  status: text("status").notNull(), // active, cancelled, expired
  paymentMethod: text("payment_method").notNull(), // card, paypal, crypto, invoice
  startDate: timestamp("start_date").defaultNow().notNull(),
  endDate: timestamp("end_date"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const newsletters = pgTable("newsletters", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  excerpt: text("excerpt").notNull(),
  category: text("category").notNull(),
  imageUrl: text("image_url"),
  authorName: text("author_name").notNull(),
  authorImage: text("author_image"),
  publishDate: timestamp("publish_date").defaultNow().notNull(),
  minSubscriptionLevel: text("min_subscription_level").notNull(), // basic, professional, enterprise
  readTime: integer("read_time").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
  name: true,
});

export const insertSubscriptionSchema = createInsertSchema(subscriptions).pick({
  userId: true,
  plan: true,
  status: true,
  paymentMethod: true,
});

export const insertNewsletterSchema = createInsertSchema(newsletters).pick({
  title: true,
  content: true,
  excerpt: true,
  category: true,
  imageUrl: true,
  authorName: true,
  authorImage: true,
  minSubscriptionLevel: true,
  readTime: true,
});

// Extended schemas for form validation
export const subscribeFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  plan: z.enum(["basic", "professional", "enterprise"], { 
    required_error: "Please select a plan" 
  }),
  paymentMethod: z.enum(["card", "paypal", "crypto", "invoice"], {
    required_error: "Please select a payment method"
  })
});

// Type definitions
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type Subscription = typeof subscriptions.$inferSelect;
export type InsertSubscription = z.infer<typeof insertSubscriptionSchema>;
export type Newsletter = typeof newsletters.$inferSelect;
export type InsertNewsletter = z.infer<typeof insertNewsletterSchema>;
export type SubscribeFormData = z.infer<typeof subscribeFormSchema>;
