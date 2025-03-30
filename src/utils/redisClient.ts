
import { createClient } from 'redis';

// Create Redis client
const redisClient = createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379',
});

// Connect to Redis when the client is used
redisClient.on('error', (err) => console.error('Redis Client Error', err));

// Helper functions for subscription data
export const saveSubscriptions = async (userId: string, subscriptions: any[]) => {
  try {
    if (!redisClient.isOpen) {
      await redisClient.connect();
    }
    await redisClient.set(`subscriptions:${userId}`, JSON.stringify(subscriptions));
    return true;
  } catch (error) {
    console.error('Error saving subscriptions to Redis:', error);
    return false;
  }
};

export const getSubscriptions = async (userId: string) => {
  try {
    if (!redisClient.isOpen) {
      await redisClient.connect();
    }
    const data = await redisClient.get(`subscriptions:${userId}`);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error getting subscriptions from Redis:', error);
    return [];
  }
};

export default redisClient;
