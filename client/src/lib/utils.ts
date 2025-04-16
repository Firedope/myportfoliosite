import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

export const scrollToElement = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }
};

export const getDateString = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date));
};

export type Plan = {
  id: string;
  name: string;
  price: number;
  features: string[];
  description: string;
  recommended?: boolean;
  badge?: string;
  savePercent?: number;
};

export const plans: Plan[] = [
  {
    id: "basic",
    name: "Basic",
    price: 9,
    features: [
      "Weekly newsletter emails",
      "Access to basic articles",
      "Monthly market summary"
    ],
    description: "Essential insights for those just getting started."
  },
  {
    id: "professional",
    name: "Professional",
    price: 29,
    features: [
      "Everything in Basic",
      "Exclusive in-depth reports",
      "Subscriber-only interviews",
      "Weekly strategy guides"
    ],
    description: "Full access to our premium content and analysis.",
    recommended: true,
    savePercent: 20
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 79,
    features: [
      "Everything in Professional",
      "Team access (up to 10 users)",
      "Quarterly strategy calls",
      "Customized industry reports",
      "Priority email support"
    ],
    description: "Team access with custom content and consulting.",
    badge: "Enterprise"
  }
];

export type PaymentOption = {
  id: string;
  name: string;
  description: string;
  icon: string;
};

export const paymentOptions: PaymentOption[] = [
  {
    id: "card",
    name: "Credit & Debit Cards",
    description: "Pay securely with your credit or debit card. We accept Visa, Mastercard, American Express, and Discover.",
    icon: "CreditCard"
  },
  {
    id: "paypal",
    name: "Digital Wallets",
    description: "Checkout quickly with your preferred digital payment method, including PayPal, Apple Pay, and Google Pay.",
    icon: "Wallet"
  },
  {
    id: "invoice",
    name: "Invoicing",
    description: "For business subscriptions, we can provide monthly or annual invoices with net-30 payment terms. Ideal for enterprise customers.",
    icon: "FileText"
  },
  {
    id: "crypto",
    name: "Cryptocurrency",
    description: "For our tech-savvy subscribers, we accept Bitcoin, Ethereum, and other major cryptocurrencies for annual subscriptions.",
    icon: "Coins"
  }
];

export type FAQ = {
  question: string;
  answer: string;
};

export const faqs: FAQ[] = [
  {
    question: "How frequently is the newsletter published?",
    answer: "Our standard newsletters are sent on a weekly basis, typically every Monday morning. Premium subscribers also receive additional mid-week updates and special reports throughout the month."
  },
  {
    question: "Can I change my subscription plan later?",
    answer: "Yes, you can upgrade, downgrade, or change your subscription plan at any time. Changes will take effect at the start of your next billing cycle. You can manage all subscription changes from your account settings."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit and debit cards, PayPal, and digital wallets like Apple Pay and Google Pay. For enterprise customers, we also offer invoice billing. Additionally, we accept cryptocurrency payments for annual subscriptions."
  },
  {
    question: "Can I cancel my subscription?",
    answer: "Yes, you can cancel your subscription at any time from your account settings. You'll continue to have access until the end of your current billing period. We don't offer prorated refunds for partial months, but you're welcome to enjoy the full access you've already paid for."
  },
  {
    question: "How do I access exclusive content?",
    answer: "Once you subscribe, you'll receive a welcome email with login details for our subscriber portal. From there, you can access all current and archived content appropriate for your subscription level. Additionally, premium content will be delivered directly to your inbox according to our publishing schedule."
  }
];
