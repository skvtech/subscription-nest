
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { subscriptions as initialSubscriptions } from "@/data/subscriptions";
import { Bell, CalendarClock, Mail } from "lucide-react";
import { Subscription } from "@/types/subscription";
import { formatCurrency } from "@/utils/subscriptionUtils";
import { useToast } from "@/hooks/use-toast";

const Reminders = () => {
  const [subscriptions, setSubscriptions] = useState(initialSubscriptions);
  const [emailDialogOpen, setEmailDialogOpen] = useState(false);
  const [email, setEmail] = useState("user@example.com");
  const { toast } = useToast();

  const activeReminders = subscriptions.filter(sub => sub.reminderSet);

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
  };

  const updateReminderDays = (id: string, days: number) => {
    setSubscriptions(subscriptions.map(sub => {
      if (sub.id === id) {
        return {
          ...sub,
          reminderDays: days
        };
      }
      return sub;
    }));
  };

  const handleSaveEmail = () => {
    setEmailDialogOpen(false);
    toast({
      title: "Email updated",
      description: "Reminder notifications will be sent to your new email address."
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="container py-6 space-y-8">
      <h1 className="text-3xl font-bold">Reminders</h1>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Mail className="mr-2 h-5 w-5" />
            Notification Settings
          </CardTitle>
          <CardDescription>
            Configure how you want to receive billing reminders
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between space-x-2 rounded-md border p-4">
              <div className="space-y-0.5">
                <Label htmlFor="email">Email Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive reminders via email
                </p>
              </div>
              <Switch id="email" defaultChecked />
            </div>
            
            <Button 
              variant="outline" 
              className="md:mt-6"
              onClick={() => setEmailDialogOpen(true)}
            >
              Update Email Address
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Bell className="mr-2 h-5 w-5" />
            Active Reminders
          </CardTitle>
          <CardDescription>
            Manage reminders for your subscriptions
          </CardDescription>
        </CardHeader>
        <CardContent>
          {activeReminders.length > 0 ? (
            <div className="space-y-4">
              {activeReminders.map((subscription) => (
                <ReminderItem
                  key={subscription.id}
                  subscription={subscription}
                  onToggleReminder={handleToggleReminder}
                  onUpdateDays={updateReminderDays}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-8 text-center">
              <Bell className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No active reminders</h3>
              <p className="text-sm text-muted-foreground mt-1 mb-4">
                You haven't set up any reminders for your subscriptions yet.
              </p>
              <Button onClick={() => window.history.back()}>
                Go Back
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
      
      <Dialog open={emailDialogOpen} onOpenChange={setEmailDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Email Address</DialogTitle>
            <DialogDescription>
              Enter the email address where you want to receive subscription reminders.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="email-input">Email Address</Label>
            <Input
              id="email-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="mt-2"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEmailDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveEmail}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

interface ReminderItemProps {
  subscription: Subscription;
  onToggleReminder: (id: string) => void;
  onUpdateDays: (id: string, days: number) => void;
}

const ReminderItem = ({ subscription, onToggleReminder, onUpdateDays }: ReminderItemProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const reminderDate = () => {
    if (!subscription.reminderDays) return "on billing date";
    
    const billingDate = new Date(subscription.nextBillingDate);
    const reminderDate = new Date(billingDate);
    reminderDate.setDate(billingDate.getDate() - subscription.reminderDays);
    
    return formatDate(reminderDate.toISOString());
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border rounded-md">
      <div className="mb-4 sm:mb-0">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-3">
            {subscription.logo}
          </div>
          <div>
            <h3 className="font-medium">{subscription.name}</h3>
            <div className="text-sm text-muted-foreground flex items-center mt-1">
              <CalendarClock className="h-4 w-4 mr-1" />
              Next billing: {formatDate(subscription.nextBillingDate)} ({formatCurrency(subscription.cost)})
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-3 w-full sm:w-auto">
        <div className="flex-1 sm:flex-initial">
          <Label htmlFor={`days-${subscription.id}`} className="text-xs text-muted-foreground">
            Days before
          </Label>
          <Input
            id={`days-${subscription.id}`}
            type="number"
            min="1"
            max="30"
            value={subscription.reminderDays || 0}
            onChange={(e) => onUpdateDays(subscription.id, parseInt(e.target.value))}
            className="w-20 h-8"
          />
        </div>
        
        <div className="flex-1 sm:flex-initial text-right sm:text-left">
          <Label htmlFor={`toggle-${subscription.id}`} className="text-xs text-muted-foreground">
            Enabled
          </Label>
          <div>
            <Switch
              id={`toggle-${subscription.id}`}
              checked={subscription.reminderSet}
              onCheckedChange={() => onToggleReminder(subscription.id)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reminders;
