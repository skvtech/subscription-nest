
import { Subscription } from '@/types/subscription';

export const subscriptions: Subscription[] = [
  {
    id: '1',
    name: 'Netflix',
    description: 'Streaming service',
    logo: 'N',
    cost: 15.99,
    billingCycle: 'monthly',
    category: 'entertainment',
    startDate: '2023-01-15',
    nextBillingDate: '2023-06-15',
    reminderSet: true,
    reminderDays: 2
  },
  {
    id: '2',
    name: 'Spotify',
    description: 'Music streaming',
    logo: 'S',
    cost: 9.99,
    billingCycle: 'monthly',
    category: 'music',
    startDate: '2022-11-10',
    nextBillingDate: '2023-06-10',
    reminderSet: false
  },
  {
    id: '3',
    name: 'Amazon Prime',
    description: 'Shopping and streaming',
    logo: 'A',
    cost: 139,
    billingCycle: 'yearly',
    category: 'shopping',
    startDate: '2022-05-21',
    nextBillingDate: '2023-05-21',
    reminderSet: true,
    reminderDays: 5
  },
  {
    id: '4',
    name: 'Hello Fresh',
    description: 'Meal kit delivery',
    logo: 'H',
    cost: 59.99,
    billingCycle: 'monthly',
    category: 'food',
    startDate: '2023-03-01',
    nextBillingDate: '2023-06-01',
    reminderSet: true,
    reminderDays: 1
  },
  {
    id: '5',
    name: 'Adobe Creative Cloud',
    description: 'Design software',
    logo: 'A',
    cost: 54.99,
    billingCycle: 'monthly',
    category: 'productivity',
    startDate: '2023-02-15',
    nextBillingDate: '2023-06-15',
    reminderSet: false
  },
  {
    id: '6',
    name: 'Planet Fitness',
    description: 'Gym membership',
    logo: 'P',
    cost: 10,
    billingCycle: 'monthly',
    category: 'fitness',
    startDate: '2022-08-10',
    nextBillingDate: '2023-06-10',
    reminderSet: false
  },
  {
    id: '7',
    name: 'Xbox Game Pass',
    description: 'Gaming subscription',
    logo: 'X',
    cost: 14.99,
    billingCycle: 'monthly',
    category: 'gaming',
    startDate: '2023-04-20',
    nextBillingDate: '2023-06-20',
    reminderSet: true,
    reminderDays: 3
  }
];
