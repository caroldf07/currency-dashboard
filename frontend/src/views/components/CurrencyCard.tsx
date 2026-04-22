import React from 'react';
import { ExchangeRate } from '../../models/ExchangeRate';

interface CurrencyCardProps {
  rate: ExchangeRate;
}

export const CurrencyCard: React.FC<CurrencyCardProps> = ({ rate }) => {
  const isPositive = rate.variationPercent >= 0;
  const variationClass = isPositive ? 'positive' : 'negative';
  const variationSign = isPositive ? '+' : '';

  return (
    <div className={`currency-card ${variationClass}`} data-testid={`card-${rate.pair}`}>
      <div className="card-header">
        <span className="pair-code">{rate.pair}</span>
        <span className={`variation-badge ${variationClass}`}>
          {variationSign}{rate.variationPercent.toFixed(2)}%
        </span>
      </div>
      <div className="card-bid">
        <span className="bid-label">Compra</span>
        <span className="bid-value">
          {rate.bid.toLocaleString('pt-BR', { minimumFractionDigits: 4, maximumFractionDigits: 4 })}
        </span>
      </div>
      <div className="card-details">
        <div className="detail-item">
          <span className="detail-label">Venda</span>
          <span className="detail-value">{rate.ask.toLocaleString('pt-BR', { minimumFractionDigits: 4 })}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Máx.</span>
          <span className="detail-value">{rate.high.toLocaleString('pt-BR', { minimumFractionDigits: 4 })}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Mín.</span>
          <span className="detail-value">{rate.low.toLocaleString('pt-BR', { minimumFractionDigits: 4 })}</span>
        </div>
      </div>
      <div className="card-description">{rate.description}</div>
    </div>
  );
};
