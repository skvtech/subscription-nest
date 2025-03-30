
import { useEffect, useState } from "react";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { SubscriptionList } from "@/components/dashboard/SubscriptionList";
import { CategoryChart } from "@/components/dashboard/CategoryChart";
import { UpcomingBillings } from "@/components/dashboard/UpcomingBillings";
import { subscriptions as initialSubscriptions } from "@/data/subscriptions";
import { 
  calculateTotalMonthlyAmount, 
  calculateTotalYearlyAmount, 
  getUpcomingBillings 
} from "@/utils/subscriptionUtils";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { PlusCircle } from "lucide-react";
import { CurrencySelector } from "@/components/dashboard/CurrencySelector";
import { CurrencyCode } from "@/utils/currencyUtils";
import { saveSubscriptions, getSubscriptions } from "@/utils/redisClient";
import { Subscription } from "@/types/subscription";

const Dashboard = () => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [currency, setCurrency] = useState<CurrencyCode>('INR');
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // For demo purposes, using a static user ID
  const userId = "user-1";

  useEffect(() => {
    const loadSubscriptions = async () => {
      try {
        // Try to load from localStorage first
        const storedData = await getSubscriptions(userId);
        
        // If no data in localStorage, use initial data and save to localStorage
        if (storedData.length === 0) {
          setSubscriptions(initialSubscriptions);
          await saveSubscriptions(userId, initialSubscriptions);
        } else {
          setSubscriptions(storedData);
        }
      } catch (error) {
        console.error("Error loading subscriptions:", error);
        // Fallback to initial data
        setSubscriptions(initialSubscriptions);
      } finally {
        setLoading(false);
      }
    };
    
    loadSubscriptions();
  }, [userId]);

  const handleEdit = (id: string) => {
    navigate(`/edit-subscription/${id}`);
  };

  const handleDelete = async (id: string) => {
    const updatedSubscriptions = subscriptions.filter(sub => sub.id !== id);
    setSubscriptions(updatedSubscriptions);
    
    // Save to localStorage
    await saveSubscriptions(userId, updatedSubscriptions);
    
    toast({
      title: "Subscription deleted",
      description: "The subscription has been removed successfully.",
    });
  };

  const handleToggleReminder = async (id: string) => {
    const updatedSubscriptions = subscriptions.map(sub => {
      if (sub.id === id) {
        const reminderSet = !sub.reminderSet;
        return {
          ...sub,
          reminderSet,
          reminderDays: reminderSet && !sub.reminderDays ? 2 : sub.reminderDays
        };
      }
      return sub;
    });
    
    setSubscriptions(updatedSubscriptions);
    
    // Save to localStorage
    await saveSubscriptions(userId, updatedSubscriptions);
    
    const subscription = subscriptions.find(sub => sub.id === id);
    if (subscription) {
      toast({
        title: subscription.reminderSet ? "Reminder disabled" : "Reminder enabled",
        description: subscription.reminderSet
          ? `Reminder for ${subscription.name} has been disabled.`
          : `You'll be reminded before ${subscription.name} billing date.`,
      });
    }
  };

  const handleCurrencyChange = (newCurrency: CurrencyCode) => {
    setCurrency(newCurrency);
  };

  if (loading) {
    return (
      <div className="container py-20 flex justify-center">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary rounded-full border-t-transparent mx-auto mb-4"></div>
          <p>Loading subscriptions...</p>
        </div>
      </div>
    );
  }

  const monthlyTotal = calculateTotalMonthlyAmount(subscriptions, currency);
  const yearlyTotal = calculateTotalYearlyAmount(subscriptions, currency);
  const upcomingCount = getUpcomingBillings(subscriptions).length;

  return (
    <div className="container py-6 space-y-8">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h1 className="text-3xl font-bold">Subscription Dashboard</h1>
        <div className="flex items-center gap-4">
          <CurrencySelector 
            currency={currency} 
            onCurrencyChange={handleCurrencyChange} 
          />
          <Button onClick={() => navigate("/add-subscription")}>
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Subscription
          </Button>
        </div>
      </div>

      <StatsCards
        subscriptionCount={subscriptions.length}
        monthlyTotal={monthlyTotal}
        yearlyTotal={yearlyTotal}
        upcomingCount={upcomingCount}
        currency={currency}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <CategoryChart subscriptions={subscriptions} currency={currency} />
        </div>
        <div>
          <UpcomingBillings subscriptions={subscriptions} currency={currency} />
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Your Subscriptions</h2>
        <SubscriptionList
          subscriptions={subscriptions}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onToggleReminder={handleToggleReminder}
          currency={currency}
        />
      </div>
    </div>
  );
};

export default Dashboard;
