import { useState, useEffect, useCallback } from 'react';
import { CurrencySnapshot } from '../models/ExchangeRate';
import { AvailableCurrency } from '../models/AvailableCurrency';
import { currencyApi } from '../services/currencyApi';

const REFRESH_INTERVAL_MS = 60 * 60 * 1000;
const DEFAULT_PAIRS = ['USD-BRL', 'EUR-BRL', 'EUR-USD'];

interface CurrencyControllerState {
  snapshot: CurrencySnapshot | null;
  availableCurrencies: AvailableCurrency[];
  selectedPairs: string[];
  loading: boolean;
  error: string | null;
  lastUpdated: Date | null;
  timeUntilRefresh: number;
}

export function useCurrencyController() {
  const [state, setState] = useState<CurrencyControllerState>({
    snapshot: null,
    availableCurrencies: [],
    selectedPairs: DEFAULT_PAIRS,
    loading: true,
    error: null,
    lastUpdated: null,
    timeUntilRefresh: REFRESH_INTERVAL_MS,
  });

  const fetchRates = useCallback(async (pairs: string[]) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const rates = await currencyApi.getRatesByPairs(pairs);
      setState(prev => ({
        ...prev,
        snapshot: { rates, fetchedAt: new Date() },
        loading: false,
        lastUpdated: new Date(),
        timeUntilRefresh: REFRESH_INTERVAL_MS,
      }));
    } catch {
      setState(prev => ({
        ...prev,
        loading: false,
        error: 'Não foi possível carregar as cotações. Tente novamente.',
      }));
    }
  }, []);

  const fetchAvailableCurrencies = useCallback(async () => {
    try {
      const currencies = await currencyApi.getAvailableCurrencies();
      setState(prev => ({ ...prev, availableCurrencies: currencies }));
    } catch {
      // silently ignore — não bloqueia o dashboard
    }
  }, []);

  // carrega moedas disponíveis uma única vez
  useEffect(() => {
    fetchAvailableCurrencies();
  }, [fetchAvailableCurrencies]);

  // refetch sempre que selectedPairs mudar
  useEffect(() => {
    fetchRates(state.selectedPairs);
    const refreshTimer = setInterval(() => fetchRates(state.selectedPairs), REFRESH_INTERVAL_MS);
    const countdownTimer = setInterval(() => {
      setState(prev => ({
        ...prev,
        timeUntilRefresh: Math.max(0, prev.timeUntilRefresh - 1000),
      }));
    }, 1000);
    return () => {
      clearInterval(refreshTimer);
      clearInterval(countdownTimer);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.selectedPairs]);

  const addPair = useCallback((pair: string) => {
    setState(prev => {
      if (prev.selectedPairs.includes(pair)) return prev;
      return { ...prev, selectedPairs: [...prev.selectedPairs, pair] };
    });
  }, []);

  const removePair = useCallback((pair: string) => {
    setState(prev => ({
      ...prev,
      selectedPairs: prev.selectedPairs.filter(p => p !== pair),
    }));
  }, []);

  return {
    ...state,
    refetch: () => fetchRates(state.selectedPairs),
    addPair,
    removePair,
  };
}
