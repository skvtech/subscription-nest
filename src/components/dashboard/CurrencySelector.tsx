
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CurrencyCode } from '@/utils/currencyUtils';

interface CurrencySelectorProps {
  currency: CurrencyCode;
  onCurrencyChange: (currency: CurrencyCode) => void;
}

export const CurrencySelector = ({ currency, onCurrencyChange }: CurrencySelectorProps) => {
  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm text-muted-foreground">Currency:</span>
      <Select
        value={currency}
        onValueChange={(value) => onCurrencyChange(value as CurrencyCode)}
      >
        <SelectTrigger className="w-20 h-8">
          <SelectValue placeholder="Currency" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="USD">USD</SelectItem>
          <SelectItem value="INR">INR</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
