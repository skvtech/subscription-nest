import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { Subscription, SubscriptionCategory } from "@/types/subscription";
import { getCategoryColor, getCategoryTotal, formatCurrency } from "@/utils/subscriptionUtils";
import { CurrencyCode } from "@/utils/currencyUtils";

interface CategoryChartProps {
  subscriptions: Subscription[];
  currency?: CurrencyCode;
}

interface ChartData {
  name: string;
  value: number;
  color: string;
}

export const CategoryChart = ({ subscriptions, currency = 'INR' }: CategoryChartProps) => {
  const [data, setData] = useState<ChartData[]>([]);

  useEffect(() => {
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

    const chartData = categories
      .map(category => {
        const total = getCategoryTotal(subscriptions, category, currency);
        return {
          name: category.charAt(0).toUpperCase() + category.slice(1),
          value: total,
          color: getCategoryColor(category)
        };
      })
      .filter(item => item.value > 0);

    setData(chartData);
  }, [subscriptions, currency]);

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Spending by Category</CardTitle>
        <CardDescription>
          Monthly breakdown of your subscription costs by category
        </CardDescription>
      </CardHeader>
      <CardContent className="h-80">
        {data.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: number) => [formatCurrency(value, currency), 'Monthly Cost']}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full flex items-center justify-center text-muted-foreground">
            No subscription data to display
          </div>
        )}
      </CardContent>
    </Card>
  );
};
