
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { SubscriptionForm } from "@/components/forms/SubscriptionForm";
import { subscriptions as initialSubscriptions } from "@/data/subscriptions";
import { useState } from "react";

const AddSubscription = () => {
  const navigate = useNavigate();
  const [subscriptions, setSubscriptions] = useState(initialSubscriptions);

  const handleSubmit = (data: any) => {
    const newSubscription = {
      id: uuidv4(),
      ...data,
    };
    
    // In a real app, this would be an API call
    setSubscriptions([...subscriptions, newSubscription]);
    
    navigate("/");
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className="container py-6">
      <h1 className="text-3xl font-bold mb-6">Add New Subscription</h1>
      <div className="bg-card rounded-lg border p-6">
        <SubscriptionForm
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </div>
    </div>
  );
};

export default AddSubscription;
