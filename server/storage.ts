import { 
  users, type User, type InsertUser, 
  subscriptions, type Subscription, type InsertSubscription,
  newsletters, type Newsletter, type InsertNewsletter
} from "@shared/schema";

// modify the interface with CRUD methods needed
export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateStripeCustomerId(userId: number, customerId: string): Promise<User>;
  updateUserStripeInfo(userId: number, stripeInfo: { customerId: string, subscriptionId: string }): Promise<User>;

  // Subscription methods
  getSubscription(id: number): Promise<Subscription | undefined>;
  getSubscriptionByUserId(userId: number): Promise<Subscription | undefined>;
  createSubscription(subscription: InsertSubscription): Promise<Subscription>;
  updateSubscriptionStatus(id: number, status: string): Promise<Subscription>;

  // Newsletter methods
  getNewsletters(): Promise<Newsletter[]>;
  getNewsletterById(id: number): Promise<Newsletter | undefined>;
  getNewslettersByCategory(category: string): Promise<Newsletter[]>;
  getNewslettersBySubscriptionLevel(level: string): Promise<Newsletter[]>;
  createNewsletter(newsletter: InsertNewsletter): Promise<Newsletter>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private subscriptions: Map<number, Subscription>;
  private newsletters: Map<number, Newsletter>;
  private currentUserId: number;
  private currentSubscriptionId: number;
  private currentNewsletterId: number;

  constructor() {
    this.users = new Map();
    this.subscriptions = new Map();
    this.newsletters = new Map();
    this.currentUserId = 1;
    this.currentSubscriptionId = 1;
    this.currentNewsletterId = 1;

    // Initialize with some sample newsletters
    this.seedNewsletters();
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email === email,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const createdAt = new Date();
    const user: User = { ...insertUser, id, createdAt, stripeCustomerId: null, stripeSubscriptionId: null };
    this.users.set(id, user);
    return user;
  }

  async updateStripeCustomerId(userId: number, customerId: string): Promise<User> {
    const user = await this.getUser(userId);
    if (!user) {
      throw new Error(`User with id ${userId} not found`);
    }
    
    const updatedUser = { ...user, stripeCustomerId: customerId };
    this.users.set(userId, updatedUser);
    return updatedUser;
  }

  async updateUserStripeInfo(userId: number, stripeInfo: { customerId: string, subscriptionId: string }): Promise<User> {
    const user = await this.getUser(userId);
    if (!user) {
      throw new Error(`User with id ${userId} not found`);
    }
    
    const updatedUser = { 
      ...user, 
      stripeCustomerId: stripeInfo.customerId,
      stripeSubscriptionId: stripeInfo.subscriptionId
    };
    this.users.set(userId, updatedUser);
    return updatedUser;
  }

  // Subscription methods
  async getSubscription(id: number): Promise<Subscription | undefined> {
    return this.subscriptions.get(id);
  }

  async getSubscriptionByUserId(userId: number): Promise<Subscription | undefined> {
    return Array.from(this.subscriptions.values()).find(
      (sub) => sub.userId === userId,
    );
  }

  async createSubscription(insertSubscription: InsertSubscription): Promise<Subscription> {
    const id = this.currentSubscriptionId++;
    const startDate = new Date();
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + 1); // Default to 1 month subscription
    const createdAt = new Date();
    
    const subscription: Subscription = { 
      ...insertSubscription, 
      id, 
      startDate,
      endDate,
      createdAt
    };
    
    this.subscriptions.set(id, subscription);
    return subscription;
  }

  async updateSubscriptionStatus(id: number, status: string): Promise<Subscription> {
    const subscription = await this.getSubscription(id);
    if (!subscription) {
      throw new Error(`Subscription with id ${id} not found`);
    }
    
    const updatedSubscription = { ...subscription, status };
    this.subscriptions.set(id, updatedSubscription);
    return updatedSubscription;
  }

  // Newsletter methods
  async getNewsletters(): Promise<Newsletter[]> {
    return Array.from(this.newsletters.values());
  }

  async getNewsletterById(id: number): Promise<Newsletter | undefined> {
    return this.newsletters.get(id);
  }

  async getNewslettersByCategory(category: string): Promise<Newsletter[]> {
    return Array.from(this.newsletters.values()).filter(
      (newsletter) => newsletter.category === category,
    );
  }

  async getNewslettersBySubscriptionLevel(level: string): Promise<Newsletter[]> {
    const levels = {
      basic: ["basic"],
      professional: ["basic", "professional"],
      enterprise: ["basic", "professional", "enterprise"]
    };
    
    const accessibleLevels = level in levels ? levels[level as keyof typeof levels] : ["basic"];
    
    return Array.from(this.newsletters.values()).filter(
      (newsletter) => accessibleLevels.includes(newsletter.minSubscriptionLevel),
    );
  }

  async createNewsletter(insertNewsletter: InsertNewsletter): Promise<Newsletter> {
    const id = this.currentNewsletterId++;
    const publishDate = new Date();
    const createdAt = new Date();
    
    const newsletter: Newsletter = { 
      ...insertNewsletter, 
      id, 
      publishDate,
      createdAt
    };
    
    this.newsletters.set(id, newsletter);
    return newsletter;
  }

  // Seed data
  private seedNewsletters() {
    const sampleNewsletters: InsertNewsletter[] = [
      {
        title: "Q3 2023 Market Outlook: Navigating Uncertain Times",
        content: "Full content of market analysis...",
        excerpt: "Our financial experts break down current market trends and provide strategies for protecting your investments in volatile conditions.",
        category: "Market Analysis",
        imageUrl: "https://images.unsplash.com/photo-1516321165247-4aa89a48be28?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1021&q=80",
        authorName: "Michael Chen",
        authorImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
        minSubscriptionLevel: "basic",
        readTime: 12
      },
      {
        title: "The Evolution of AI: What Business Leaders Need to Know",
        content: "Full content about AI evolution...",
        excerpt: "Explore the latest advancements in artificial intelligence and learn how to leverage AI technologies in your organization.",
        category: "Technology",
        imageUrl: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        authorName: "Sophia Rodriguez",
        authorImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
        minSubscriptionLevel: "professional",
        readTime: 9
      },
      {
        title: "5 Leadership Techniques from Fortune 500 CEOs",
        content: "Full content about leadership techniques...",
        excerpt: "Learn the proven management strategies that have helped top executives build world-class teams and drive exceptional results.",
        category: "Leadership",
        imageUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        authorName: "James Wilson",
        authorImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        minSubscriptionLevel: "enterprise",
        readTime: 15
      }
    ];

    sampleNewsletters.forEach(newsletter => {
      this.createNewsletter(newsletter);
    });
  }
}

export const storage = new MemStorage();
