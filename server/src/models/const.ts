import { CurrencyType } from './types';

export const baseCurrency = {
  id: '1',
  name: 'Indian Rupee',
  code: 'INR',
  symbol: '₹'
};

export const currenciesByCode: { [key: string]: CurrencyType } = {
  INR: baseCurrency
};
