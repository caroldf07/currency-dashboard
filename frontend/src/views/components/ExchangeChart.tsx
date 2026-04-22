import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { ExchangeRate } from '../../models/ExchangeRate';

interface ExchangeChartProps {
  rates: ExchangeRate[];
}

export const ExchangeChart: React.FC<ExchangeChartProps> = ({ rates }) => {
  const data = rates.map(rate => ({
    pair: rate.pair,
    Compra: Number(rate.bid.toFixed(4)),
    Venda: Number(rate.ask.toFixed(4)),
    Máximo: Number(rate.high.toFixed(4)),
    Mínimo: Number(rate.low.toFixed(4)),
  }));

  return (
    <div className="chart-container" data-testid="exchange-chart">
      <h2 className="chart-title">Comparativo de Cotações</h2>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#2a2a4a" />
          <XAxis dataKey="pair" stroke="#a0a0c0" />
          <YAxis stroke="#a0a0c0" />
          <Tooltip
            contentStyle={{ backgroundColor: '#1a1a3a', border: '1px solid #3a3a6a', borderRadius: '8px' }}
            labelStyle={{ color: '#ffffff' }}
          />
          <Legend />
          <Bar dataKey="Compra" fill="#4f8ef7" radius={[4, 4, 0, 0]} />
          <Bar dataKey="Venda" fill="#f74f8e" radius={[4, 4, 0, 0]} />
          <Bar dataKey="Máximo" fill="#4ff7a0" radius={[4, 4, 0, 0]} />
          <Bar dataKey="Mínimo" fill="#f7c94f" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
