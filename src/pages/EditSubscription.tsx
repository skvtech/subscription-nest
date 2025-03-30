
import { useNavigate, useParams } from "react-router-dom";
import { SubscriptionForm } from "@/components/forms/SubscriptionForm";
import { subscriptions as initialSubscriptions } from "@/data/subscriptions";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const EditSubscription = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [subscriptions, setSubscriptions] = useState(initialSubscriptions);

  const subscription = subscriptions.find(sub => sub.id === id);

  if (!subscription) {
    navigate("/");
    toast({
      title: "Subscription not found",
      description: "The subscription you're trying to edit doesn't exist.",
      variant: "destructive",
    });
    return null;
  }

  const handleSubmit = (data: any) => {
    const updatedSubscriptions = subscriptions.map(sub => 
      sub.id === id ? { ...sub, ...data } : sub
    );
    
    // In a real app, this would be an API call
    setSubscriptions(updatedSubscriptions);
    
    navigate("/");
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className="container py-6">
      <h1 className="text-3xl font-bold mb-6">Edit Subscription</h1>
      <div className="bg-card rounded-lg border p-6">
        <SubscriptionForm
          initialData={subscription}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </div>
    </div>
  );
};

export default EditSubscription;
