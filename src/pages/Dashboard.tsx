
import { useState } from "react";
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

const Dashboard = () => {
  const [subscriptions, setSubscriptions] = useState(initialSubscriptions);
  const { toast } = useToast();
  const navigate = useNavigate();

  const monthlyTotal = calculateTotalMonthlyAmount(subscriptions);
  const yearlyTotal = calculateTotalYearlyAmount(subscriptions);
  const upcomingCount = getUpcomingBillings(subscriptions).length;

  const handleEdit = (id: string) => {
    navigate(`/edit-subscription/${id}`);
  };

  const handleDelete = (id: string) => {
    setSubscriptions(subscriptions.filter(sub => sub.id !== id));
    toast({
      title: "Subscription deleted",
      description: "The subscription has been removed successfully.",
    });
  };

  const handleToggleReminder = (id: string) => {
    setSubscriptions(subscriptions.map(sub => {
      if (sub.id === id) {
        const reminderSet = !sub.reminderSet;
        return {
          ...sub,
          reminderSet,
          reminderDays: reminderSet && !sub.reminderDays ? 2 : sub.reminderDays
        };
      }
      return sub;
    }));
    
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

  return (
    <div className="container py-6 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Subscription Dashboard</h1>
        <Button onClick={() => navigate("/add-subscription")}>
          <PlusCircle className="h-4 w-4 mr-2" />
          Add Subscription
        </Button>
      </div>

      <StatsCards
        subscriptionCount={subscriptions.length}
        monthlyTotal={monthlyTotal}
        yearlyTotal={yearlyTotal}
        upcomingCount={upcomingCount}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <CategoryChart subscriptions={subscriptions} />
        </div>
        <div>
          <UpcomingBillings subscriptions={subscriptions} />
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Your Subscriptions</h2>
        <SubscriptionList
          subscriptions={subscriptions}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onToggleReminder={handleToggleReminder}
        />
      </div>
    </div>
  );
};

export default Dashboard;
