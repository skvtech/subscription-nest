
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Subscription } from "@/types/subscription";
import { getUpcomingBillings, formatCurrency } from "@/utils/subscriptionUtils";
import { Calendar } from "lucide-react";
import { CurrencyCode } from "@/utils/currencyUtils";

interface UpcomingBillingsProps {
  subscriptions: Subscription[];
  currency?: CurrencyCode;
}

export const UpcomingBillings = ({ subscriptions, currency = 'USD' }: UpcomingBillingsProps) => {
  const upcomingBillings = getUpcomingBillings(subscriptions, 7);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getDaysUntil = (dateString: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const billingDate = new Date(dateString);
    billingDate.setHours(0, 0, 0, 0);
    
    const diffTime = billingDate.getTime() - today.getTime();
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Tomorrow";
    return `In ${diffDays} days`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Billings</CardTitle>
        <CardDescription>
          Subscriptions due in the next 7 days
        </CardDescription>
      </CardHeader>
      <CardContent>
        {upcomingBillings.length > 0 ? (
          <div className="space-y-4">
            {upcomingBillings.map((sub) => (
              <div 
                key={sub.id}
                className="flex items-center justify-between p-3 border rounded-md"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                    {sub.logo}
                  </div>
                  <div>
                    <div className="font-medium">{sub.name}</div>
                    <div className="text-sm text-muted-foreground">{formatDate(sub.nextBillingDate)}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="font-medium">{formatCurrency(sub.cost, currency)}</div>
                    <div className="text-sm text-muted-foreground">{getDaysUntil(sub.nextBillingDate)}</div>
                  </div>
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="h-24 flex items-center justify-center text-muted-foreground">
            No upcoming billings in the next 7 days
          </div>
        )}
      </CardContent>
    </Card>
  );
};
