import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { useLocation } from 'wouter';
import Navbar from '@/components/navigation/navbar';
import Footer from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getDateString, plans } from '@/lib/utils';
import { Newsletter, User, Subscription } from '@shared/schema';

export default function Dashboard() {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [activeSubscription, setActiveSubscription] = useState<Subscription | null>(null);
  const [user, setUser] = useState<User | null>(null);

  // Simulate a logged-in user and subscription
  // In a real app, you would fetch this from your API
  useEffect(() => {
    // Simulate user data
    const simulatedUser: User = {
      id: 1,
      username: 'user123',
      password: '', // Not shown to client
      email: 'user@example.com',
      name: 'John Doe',
      stripeCustomerId: 'cus_123456',
      stripeSubscriptionId: 'sub_123456',
      createdAt: new Date()
    };
    
    // Simulate subscription data
    const simulatedSubscription: Subscription = {
      id: 1,
      userId: 1,
      plan: 'professional',
      status: 'active',
      paymentMethod: 'card',
      startDate: new Date(),
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
      createdAt: new Date()
    };
    
    setUser(simulatedUser);
    setActiveSubscription(simulatedSubscription);
    
    // Display welcome toast
    toast({
      title: 'Welcome to Your Dashboard',
      description: 'You now have access to exclusive content',
    });
  }, [toast]);

  // Fetch newsletters based on subscription level
  const { data: newsletters, isLoading } = useQuery<Newsletter[]>({
    queryKey: ['/api/newsletters/access/professional'], // Use the subscription level from the user
    enabled: !!activeSubscription, // Only run query if user has an active subscription
  });

  if (!user || !activeSubscription) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-12">
          <Card>
            <CardHeader>
              <CardTitle>Access Required</CardTitle>
              <CardDescription>
                You need to be subscribed to view this page.
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button onClick={() => navigate('/')}>Subscribe Now</Button>
            </CardFooter>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  // Find current plan details
  const currentPlan = plans.find(p => p.id === activeSubscription.plan);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Welcome back, {user.name}</h1>
          <p className="text-gray-500 mt-2">
            Your {currentPlan?.name} subscription is active until {getDateString(activeSubscription.endDate)}
          </p>
        </header>

        <Tabs defaultValue="content">
          <TabsList className="mb-6">
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="subscription">Subscription</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
          </TabsList>

          <TabsContent value="content" className="space-y-6">
            <h2 className="text-2xl font-semibold">Your Premium Content</h2>
            
            {isLoading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {newsletters?.map((newsletter) => (
                  <Card key={newsletter.id} className="h-full flex flex-col">
                    <div className="w-full h-48 overflow-hidden">
                      <img 
                        src={newsletter.imageUrl} 
                        alt={newsletter.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardHeader>
                      <div className="text-sm font-medium text-primary-600">
                        {newsletter.category}
                      </div>
                      <CardTitle>{newsletter.title}</CardTitle>
                      <CardDescription>{newsletter.excerpt}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <div className="text-sm text-gray-500">
                        {getDateString(newsletter.publishDate)} • {newsletter.readTime} min read
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">Read Now</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="subscription">
            <Card>
              <CardHeader>
                <CardTitle>Your Subscription</CardTitle>
                <CardDescription>Manage your newsletter subscription</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-primary-50 p-4 rounded-lg border border-primary-100">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium text-lg">{currentPlan?.name} Plan</p>
                      <p className="text-gray-500">${currentPlan?.price}/month</p>
                    </div>
                    <div className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm font-medium">
                      Active
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Includes:</h3>
                  <ul className="space-y-2">
                    {currentPlan?.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t pt-4">
                  <p className="text-sm text-gray-500">
                    Next billing date: {getDateString(activeSubscription.endDate)}
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-2 sm:flex-row sm:justify-between sm:space-x-2 sm:space-y-0">
                <Button variant="outline">Change Plan</Button>
                <Button variant="destructive">Cancel Subscription</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>Manage your profile and preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1">
                  <label className="text-sm font-medium">Name</label>
                  <p className="p-2 border rounded-md">{user.name}</p>
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium">Email</label>
                  <p className="p-2 border rounded-md">{user.email}</p>
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium">Username</label>
                  <p className="p-2 border rounded-md">{user.username}</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline">Edit Profile</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
}
