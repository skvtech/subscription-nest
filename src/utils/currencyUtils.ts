
// Current exchange rate (in a real app, this would be fetched from an API)
const USD_TO_INR_EXCHANGE_RATE = 83.25;

export type CurrencyCode = 'USD' | 'INR';

export const convertCurrency = (amount: number, from: CurrencyCode, to: CurrencyCode): number => {
  if (from === to) return amount;
  
  if (from === 'USD' && to === 'INR') {
    return amount * USD_TO_INR_EXCHANGE_RATE;
  }
  
  if (from === 'INR' && to === 'USD') {
    return amount / USD_TO_INR_EXCHANGE_RATE;
  }
  
  return amount;
};

export const formatCurrency = (amount: number, currency: CurrencyCode = 'USD'): string => {
  const options: Intl.NumberFormatOptions = {
    style: 'currency',
    minimumFractionDigits: 2,
  };
  
  if (currency === 'USD') {
    options.currency = 'USD';
  } else if (currency === 'INR') {
    options.currency = 'INR';
  }
  
  return new Intl.NumberFormat('en-US', options).format(amount);
};
