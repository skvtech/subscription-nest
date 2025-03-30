
export type CurrencyCode = 'INR';

export const formatCurrency = (amount: number, currency: CurrencyCode = 'INR'): string => {
  const options: Intl.NumberFormatOptions = {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
  };
  
  return new Intl.NumberFormat('en-IN', options).format(amount);
};
