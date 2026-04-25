import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor, act } from '@testing-library/react';
import { useCurrencyController } from './useCurrencyController';
import * as currencyApi from '../services/currencyApi';

vi.mock('../services/currencyApi', () => ({
  currencyApi: {
    getRatesByPairs: vi.fn(),
    getAvailableCurrencies: vi.fn(),
  },
}));

const mockRates = [
  {
    pair: 'USD-BRL',
    description: 'Dólar Americano/Real Brasileiro',
    bid: 5.20,
    ask: 5.22,
    high: 5.25,
    low: 5.18,
    variation: 0.02,
    variationPercent: 0.38,
    timestamp: '2024-01-15T10:00:00',
  },
];

describe('useCurrencyController', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(currencyApi.currencyApi.getAvailableCurrencies).mockResolvedValue([]);
  });

  it('deve iniciar com loading true', () => {
    vi.mocked(currencyApi.currencyApi.getRatesByPairs).mockResolvedValue(mockRates);
    const { result } = renderHook(() => useCurrencyController());
    expect(result.current.loading).toBe(true);
  });

  it('deve carregar as cotações com sucesso', async () => {
    vi.mocked(currencyApi.currencyApi.getRatesByPairs).mockResolvedValue(mockRates);
    const { result } = renderHook(() => useCurrencyController());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.snapshot?.rates).toEqual(mockRates);
    expect(result.current.error).toBeNull();
  });

  it('deve definir erro quando API falhar', async () => {
    vi.mocked(currencyApi.currencyApi.getRatesByPairs).mockRejectedValue(new Error('Network Error'));
    const { result } = renderHook(() => useCurrencyController());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBeTruthy();
    expect(result.current.snapshot).toBeNull();
  });

  it('deve adicionar par à lista', async () => {
    vi.mocked(currencyApi.currencyApi.getRatesByPairs).mockResolvedValue(mockRates);
    const { result } = renderHook(() => useCurrencyController());

    await waitFor(() => expect(result.current.loading).toBe(false));

    await act(async () => {
      result.current.addPair('JPY-BRL');
    });

    await waitFor(() => expect(result.current.selectedPairs).toContain('JPY-BRL'));
  });

  it('deve remover par da lista', async () => {
    vi.mocked(currencyApi.currencyApi.getRatesByPairs).mockResolvedValue(mockRates);
    const { result } = renderHook(() => useCurrencyController());

    await waitFor(() => expect(result.current.loading).toBe(false));

    await act(async () => {
      result.current.removePair('EUR-USD');
    });

    await waitFor(() => expect(result.current.selectedPairs).not.toContain('EUR-USD'));
  });
});
