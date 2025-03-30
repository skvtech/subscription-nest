
export type SubscriptionCategory = 
  | 'entertainment' 
  | 'music' 
  | 'food' 
  | 'fitness' 
  | 'shopping' 
  | 'productivity' 
  | 'gaming'
  | 'other';

export interface Subscription {
  id: string;
  name: string;
  description?: string;
  logo?: string;
  cost: number;
  billingCycle: 'monthly' | 'yearly' | 'quarterly';
  category: SubscriptionCategory;
  startDate: string;
  nextBillingDate: string;
  reminderSet: boolean;
  reminderDays?: number;
}
