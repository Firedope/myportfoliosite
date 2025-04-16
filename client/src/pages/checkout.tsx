import { useStripe, Elements, PaymentElement, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useLocation, Link } from 'wouter';
import Navbar from "@/components/navigation/navbar";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

// Make sure to call `loadStripe` outside of a component's render to avoid
// recreating the `Stripe` object on every render.
const stripeKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY;
const stripePromise = stripeKey
  ? loadStripe(stripeKey)
  : null;

const CheckoutForm = ({ planName, price, userId, subscriptionId }: { 
  planName: string;
  price: string;
  userId: number;
  subscriptionId: number;
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [, navigate] = useLocation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: window.location.origin + "/dashboard",
        },
        redirect: "if_required",
      });

      if (error) {
        toast({
          title: "Payment Failed",
          description: error.message,
          variant: "destructive",
        });
        setIsLoading(false);
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
        // Inform the server that payment was successful
        await apiRequest("POST", "/api/subscription/confirm", { 
          userId,
          subscriptionId,
          paymentIntentId: paymentIntent.id
        });

        toast({
          title: "Payment Successful",
          description: "Thank you for your subscription!",
        });
        
        // Redirect to dashboard
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Payment confirmation error:", err);
      toast({
        title: "An error occurred",
        description: "Please try again later",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-4">
        <PaymentElement />
      </div>
      <Button type="submit" disabled={!stripe || isLoading} className="w-full">
        {isLoading ? "Processing..." : `Pay ${price}`}
      </Button>
    </form>
  );
};

export default function Checkout() {
  const [clientSecret, setClientSecret] = useState("");
  const [plan, setPlan] = useState<string | null>(null);
  const [price, setPrice] = useState<string>("");
  const [userId, setUserId] = useState<number | null>(null);
  const [subscriptionId, setSubscriptionId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const [, navigate] = useLocation();

  useEffect(() => {
    // Get plan from URL search params
    const searchParams = new URLSearchParams(window.location.search);
    const planParam = searchParams.get("plan");
    const userIdParam = searchParams.get("userId");
    const subscriptionIdParam = searchParams.get("subscriptionId");
    
    if (!planParam || !userIdParam || !subscriptionIdParam) {
      toast({
        title: "Missing information",
        description: "Required checkout information is missing",
        variant: "destructive",
      });
      navigate("/");
      return;
    }
    
    setPlan(planParam);
    setUserId(parseInt(userIdParam));
    setSubscriptionId(parseInt(subscriptionIdParam));
    
    // Set price based on plan
    switch (planParam) {
      case "basic":
        setPrice("$9/month");
        break;
      case "professional":
        setPrice("$29/month");
        break;
      case "enterprise":
        setPrice("$79/month");
        break;
      default:
        setPrice("Unknown");
    }

    // Create PaymentIntent
    const createPaymentIntent = async () => {
      try {
        const res = await apiRequest("POST", "/api/create-payment-intent", { plan: planParam });
        const data = await res.json();
        setClientSecret(data.clientSecret);
      } catch (error) {
        console.error("Error creating payment intent:", error);
        toast({
          title: "Payment Setup Failed",
          description: "Could not set up payment. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    createPaymentIntent();
  }, [toast, navigate]);

  if (!stripePromise) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container max-w-md mx-auto px-4 py-16">
          <Card>
            <CardHeader>
              <CardTitle>Stripe Configuration Error</CardTitle>
              <CardDescription>
                The payment system is not properly configured. Please contact support.
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Link href="/">
                <Button variant="outline" className="w-full">Return Home</Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  if (isLoading || !clientSecret) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto flex items-center justify-center h-[calc(100vh-200px)]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
        <Footer />
      </div>
    );
  }

  const options = {
    clientSecret,
    appearance: {
      theme: 'stripe',
    },
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container max-w-3xl mx-auto px-4 py-12">
        <Card>
          <CardHeader>
            <CardTitle>Complete Your Subscription</CardTitle>
            <CardDescription>
              You're subscribing to the {plan?.charAt(0).toUpperCase() + plan?.slice(1)} plan at {price}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {clientSecret && userId && subscriptionId && (
              <Elements stripe={stripePromise} options={options}>
                <CheckoutForm 
                  planName={plan || ""} 
                  price={price}
                  userId={userId}
                  subscriptionId={subscriptionId}
                />
              </Elements>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Link href="/">
              <Button variant="outline">Cancel</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
      <Footer />
    </div>
  );
}
