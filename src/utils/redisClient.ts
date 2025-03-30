
// Browser storage client that mimics Redis functionality but uses localStorage

// Helper functions for subscription data
export const saveSubscriptions = async (userId: string, subscriptions: any[]) => {
  try {
    localStorage.setItem(`subscriptions:${userId}`, JSON.stringify(subscriptions));
    return true;
  } catch (error) {
    console.error('Error saving subscriptions to localStorage:', error);
    return false;
  }
};

export const getSubscriptions = async (userId: string) => {
  try {
    const data = localStorage.getItem(`subscriptions:${userId}`);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error getting subscriptions from localStorage:', error);
    return [];
  }
};

// No need to export a client for localStorage
const mockClient = {
  isOpen: true,
};

export default mockClient;
