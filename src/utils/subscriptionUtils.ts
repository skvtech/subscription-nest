import { Subscription, SubscriptionCategory } from "@/types/subscription";
import { CurrencyCode, convertCurrency, formatCurrency as formatCurrencyUtil } from "./currencyUtils";

export const calculateTotalMonthlyAmount = (subscriptions: Subscription[], currency: CurrencyCode = 'USD'): number => {
  const totalUSD = subscriptions.reduce((total, subscription) => {
    let monthlyCost = subscription.cost;
    
    if (subscription.billingCycle === 'yearly') {
      monthlyCost = subscription.cost / 12;
    } else if (subscription.billingCycle === 'quarterly') {
      monthlyCost = subscription.cost / 3;
    }
    
    return total + monthlyCost;
  }, 0);
  
  return currency === 'USD' ? totalUSD : convertCurrency(totalUSD, 'USD', currency);
};

export const calculateTotalYearlyAmount = (subscriptions: Subscription[], currency: CurrencyCode = 'USD'): number => {
  const totalUSD = subscriptions.reduce((total, subscription) => {
    let yearlyCost = subscription.cost;
    
    if (subscription.billingCycle === 'monthly') {
      yearlyCost = subscription.cost * 12;
    } else if (subscription.billingCycle === 'quarterly') {
      yearlyCost = subscription.cost * 4;
    }
    
    return total + yearlyCost;
  }, 0);
  
  return currency === 'USD' ? totalUSD : convertCurrency(totalUSD, 'USD', currency);
};

export const getCategoryTotal = (subscriptions: Subscription[], category: SubscriptionCategory, currency: CurrencyCode = 'USD'): number => {
  const totalUSD = subscriptions
    .filter(sub => sub.category === category)
    .reduce((total, sub) => {
      let monthlyCost = sub.cost;
      
      if (sub.billingCycle === 'yearly') {
        monthlyCost = sub.cost / 12;
      } else if (sub.billingCycle === 'quarterly') {
        monthlyCost = sub.cost / 3;
      }
      
      return total + monthlyCost;
    }, 0);
  
  return currency === 'USD' ? totalUSD : convertCurrency(totalUSD, 'USD', currency);
};

export const getCategoryColor = (category: SubscriptionCategory): string => {
  const colors: Record<SubscriptionCategory, string> = {
    entertainment: '#FF4560',
    music: '#00E396',
    food: '#FEB019',
    fitness: '#008FFB',
    shopping: '#775DD0',
    productivity: '#2E93fA',
    gaming: '#66DA26',
    other: '#546E7A'
  };
  
  return colors[category];
};

export const formatCurrency = (amount: number, currency: CurrencyCode = 'USD'): string => {
  return formatCurrencyUtil(amount, currency);
};

export const getUpcomingBillings = (subscriptions: Subscription[], days: number = 7): Subscription[] => {
  const today = new Date();
  const cutoffDate = new Date();
  cutoffDate.setDate(today.getDate() + days);
  
  return subscriptions.filter(sub => {
    const billingDate = new Date(sub.nextBillingDate);
    return billingDate >= today && billingDate <= cutoffDate;
  }).sort((a, b) => new Date(a.nextBillingDate).getTime() - new Date(b.nextBillingDate).getTime());
};

export const getCategoryIcon = (category: SubscriptionCategory): string => {
  const icons: Record<SubscriptionCategory, string> = {
    entertainment: '🎬',
    music: '🎵',
    food: '🍔',
    fitness: '💪',
    shopping: '🛍️',
    productivity: '💻',
    gaming: '🎮',
    other: '📦'
  };
  
  return icons[category];
};
