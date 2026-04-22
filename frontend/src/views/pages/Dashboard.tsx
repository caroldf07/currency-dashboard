import React from 'react';
import { useCurrencyController } from '../../controllers/useCurrencyController';
import { Header } from '../components/Header';
import { CurrencyCard } from '../components/CurrencyCard';
import { ExchangeChart } from '../components/ExchangeChart';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { CurrencySelector } from '../components/CurrencySelector';

export const Dashboard: React.FC = () => {
  const {
    snapshot, loading, error, lastUpdated, timeUntilRefresh,
    refetch, availableCurrencies, selectedPairs, addPair, removePair,
  } = useCurrencyController();

  return (
    <div className="dashboard">
      <Header
        lastUpdated={lastUpdated}
        timeUntilRefresh={timeUntilRefresh}
        onRefresh={refetch}
      />
      <main className="main-content">
        <CurrencySelector
          availableCurrencies={availableCurrencies}
          selectedPairs={selectedPairs}
          onAdd={addPair}
          onRemove={removePair}
          loading={loading}
        />

        {loading && !snapshot && <LoadingSpinner />}
        {error && (
          <div className="error-banner" data-testid="error-banner">
            <p>{error}</p>
            <button onClick={refetch}>Tentar novamente</button>
          </div>
        )}
        {snapshot && snapshot.rates.length > 0 && (
          <>
            <section className="cards-section" data-testid="cards-section">
              <div className="cards-grid">
                {snapshot.rates.map(rate => (
                  <CurrencyCard key={rate.pair} rate={rate} />
                ))}
              </div>
            </section>
            <section className="chart-section">
              <ExchangeChart rates={snapshot.rates} />
            </section>
          </>
        )}
        {snapshot && snapshot.rates.length === 0 && !loading && (
          <div className="empty-state" data-testid="empty-state">
            <p>Nenhum par selecionado. Use o seletor acima para adicionar moedas.</p>
          </div>
        )}
      </main>
      <footer className="footer">
        <p>Dados fornecidos por AwesomeAPI · Monitor de Câmbio</p>
      </footer>
    </div>
  );
};
