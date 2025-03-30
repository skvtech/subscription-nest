
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Subscription } from "@/types/subscription";
import { formatCurrency, getCategoryIcon } from "@/utils/subscriptionUtils";
import { Bell, Edit, MoreHorizontal, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface SubscriptionListProps {
  subscriptions: Subscription[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onToggleReminder: (id: string) => void;
}

export const SubscriptionList = ({
  subscriptions,
  onEdit,
  onDelete,
  onToggleReminder,
}: SubscriptionListProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  const getBillingCycleLabel = (cycle: 'monthly' | 'yearly' | 'quarterly') => {
    switch (cycle) {
      case 'monthly':
        return 'Monthly';
      case 'yearly':
        return 'Yearly';
      case 'quarterly':
        return 'Quarterly';
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Billing Cycle</TableHead>
            <TableHead>Next Billing</TableHead>
            <TableHead>Reminder</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {subscriptions.map((subscription) => (
            <TableRow key={subscription.id}>
              <TableCell className="font-medium">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                    {subscription.logo}
                  </div>
                  <div>
                    <div>{subscription.name}</div>
                    {subscription.description && (
                      <div className="text-xs text-muted-foreground">{subscription.description}</div>
                    )}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className="capitalize">
                  {getCategoryIcon(subscription.category)} {subscription.category}
                </Badge>
              </TableCell>
              <TableCell>{formatCurrency(subscription.cost)}</TableCell>
              <TableCell>{getBillingCycleLabel(subscription.billingCycle)}</TableCell>
              <TableCell>{formatDate(subscription.nextBillingDate)}</TableCell>
              <TableCell>
                <Button 
                  variant={subscription.reminderSet ? "default" : "outline"} 
                  size="sm"
                  onClick={() => onToggleReminder(subscription.id)}
                >
                  <Bell className="h-4 w-4 mr-1" />
                  {subscription.reminderSet ? 'On' : 'Off'}
                </Button>
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Actions</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onEdit(subscription.id)}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => onDelete(subscription.id)}
                      className="text-destructive focus:text-destructive"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
