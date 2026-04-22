import React, { useState, useMemo } from 'react';
import { AvailableCurrency } from '../../models/AvailableCurrency';

interface CurrencySelectorProps {
  availableCurrencies: AvailableCurrency[];
  selectedPairs: string[];
  onAdd: (pair: string) => void;
  onRemove: (pair: string) => void;
  loading: boolean;
}

export const CurrencySelector: React.FC<CurrencySelectorProps> = ({
  availableCurrencies,
  selectedPairs,
  onAdd,
  onRemove,
  loading,
}) => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    if (!search) return availableCurrencies;
    const q = search.toLowerCase();
    return availableCurrencies.filter(
      c => c.code.toLowerCase().includes(q) || c.name.toLowerCase().includes(q)
    );
  }, [availableCurrencies, search]);

  const handleAdd = () => {
    if (!from || !to || from === to) return;
    const pair = `${from}-${to}`;
    if (selectedPairs.includes(pair)) return;
    onAdd(pair);
    setFrom('');
    setTo('');
  };

  const isAddDisabled = !from || !to || from === to || selectedPairs.includes(`${from}-${to}`);

  return (
    <div className="selector-wrapper" data-testid="currency-selector">
      <h2 className="selector-title">Comparar Moedas</h2>

      <div className="selector-controls">
        <div className="selector-field">
          <label>Buscar moeda</label>
          <input
            className="selector-search"
            type="text"
            placeholder="Ex: Dólar, JPY..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        <div className="selector-field">
          <label>De</label>
          <select
            className="selector-select"
            value={from}
            onChange={e => setFrom(e.target.value)}
            data-testid="select-from"
          >
            <option value="">Selecione...</option>
            {filtered.map(c => (
              <option key={c.code} value={c.code}>
                {c.code} — {c.name}
              </option>
            ))}
          </select>
        </div>

        <div className="selector-field">
          <label>Para</label>
          <select
            className="selector-select"
            value={to}
            onChange={e => setTo(e.target.value)}
            data-testid="select-to"
          >
            <option value="">Selecione...</option>
            {filtered.map(c => (
              <option key={c.code} value={c.code}>
                {c.code} — {c.name}
              </option>
            ))}
          </select>
        </div>

        <button
          className="add-btn"
          onClick={handleAdd}
          disabled={isAddDisabled || loading}
          data-testid="add-pair-btn"
        >
          + Adicionar
        </button>
      </div>

      {selectedPairs.length > 0 && (
        <div className="pairs-chips" data-testid="pairs-chips">
          {selectedPairs.map(pair => (
            <span key={pair} className="pair-chip" data-testid={`chip-${pair}`}>
              {pair}
              <button
                className="chip-remove"
                onClick={() => onRemove(pair)}
                aria-label={`Remover ${pair}`}
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
};
