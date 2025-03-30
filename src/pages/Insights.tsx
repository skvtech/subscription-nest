
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { subscriptions } from "@/data/subscriptions";
import { getCategoryColor, getCategoryTotal, formatCurrency } from "@/utils/subscriptionUtils";
import { SubscriptionCategory } from "@/types/subscription";

const Insights = () => {
  const [activeTab, setActiveTab] = useState("monthly");

  // Prepare category data
  const categories: SubscriptionCategory[] = [
    'entertainment',
    'music',
    'food',
    'fitness',
    'shopping',
    'productivity',
    'gaming',
    'other'
  ];

  const categoryData = categories
    .map(category => {
      const total = getCategoryTotal(subscriptions, category);
      if (total === 0) return null;
      
      return {
        name: category.charAt(0).toUpperCase() + category.slice(1),
        value: activeTab === "yearly" ? total * 12 : total,
        color: getCategoryColor(category)
      };
    })
    .filter(Boolean);

  // Prepare monthly trend data
  const today = new Date();
  const monthlyTrendData = Array.from({ length: 12 }, (_, i) => {
    const month = new Date(today.getFullYear(), today.getMonth() - 11 + i, 1);
    const monthName = month.toLocaleString('default', { month: 'short' });
    
    // Simulate some variation in monthly costs
    const baseAmount = getCategoryTotal(subscriptions, 'entertainment') + 
                       getCategoryTotal(subscriptions, 'music') +
                       getCategoryTotal(subscriptions, 'food');
    
    const variation = Math.random() * 20 - 10; // Random variation between -10 and +10
    
    return {
      name: monthName,
      amount: baseAmount + variation
    };
  });

  return (
    <div className="container py-6 space-y-8">
      <h1 className="text-3xl font-bold">Subscription Insights</h1>
      
      <Tabs defaultValue="monthly" onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="monthly">Monthly</TabsTrigger>
          <TabsTrigger value="yearly">Yearly</TabsTrigger>
        </TabsList>
        
        <TabsContent value="monthly" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Spending by Category</CardTitle>
                <CardDescription>Monthly breakdown of your subscription costs</CardDescription>
              </CardHeader>
              <CardContent className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry?.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: number) => [formatCurrency(value), 'Monthly Cost']} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Category Comparison</CardTitle>
                <CardDescription>How your subscriptions compare by category</CardDescription>
              </CardHeader>
              <CardContent className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={categoryData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis tickFormatter={(value) => `$${value}`} />
                    <Tooltip formatter={(value: number) => [formatCurrency(value), 'Monthly Cost']} />
                    <Bar dataKey="value" name="Monthly Cost">
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry?.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Monthly Trends</CardTitle>
              <CardDescription>How your subscription spending has changed over time</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis tickFormatter={(value) => `$${value}`} />
                  <Tooltip formatter={(value: number) => [formatCurrency(value), 'Monthly Cost']} />
                  <Legend />
                  <Bar dataKey="amount" name="Monthly Spending" fill="#4f46e5" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="yearly" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Annual Spending by Category</CardTitle>
                <CardDescription>Yearly breakdown of your subscription costs</CardDescription>
              </CardHeader>
              <CardContent className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry?.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: number) => [formatCurrency(value), 'Yearly Cost']} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Annual Category Comparison</CardTitle>
                <CardDescription>How your subscriptions compare by category annually</CardDescription>
              </CardHeader>
              <CardContent className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={categoryData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis tickFormatter={(value) => `$${value}`} />
                    <Tooltip formatter={(value: number) => [formatCurrency(value), 'Yearly Cost']} />
                    <Bar dataKey="value" name="Yearly Cost">
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry?.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Insights;
