import axios from 'axios';
import { ExchangeRate } from '../models/ExchangeRate';
import { AvailableCurrency } from '../models/AvailableCurrency';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

const api = axios.create({
  baseURL: `${API_URL}/api/v1`,
  timeout: 10000,
});

export const currencyApi = {
  getDefaultRates: async (): Promise<ExchangeRate[]> => {
    const response = await api.get<ExchangeRate[]>('/currencies');
    return response.data;
  },

  getRatesByPairs: async (pairs: string[]): Promise<ExchangeRate[]> => {
    const response = await api.get<ExchangeRate[]>('/currencies', {
      params: { pairs: pairs.join(',') },
    });
    return response.data;
  },

  getAvailableCurrencies: async (): Promise<AvailableCurrency[]> => {
    const response = await api.get<AvailableCurrency[]>('/currencies/available');
    return response.data;
  },
};
