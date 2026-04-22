import React from 'react';

interface HeaderProps {
  lastUpdated: Date | null;
  timeUntilRefresh: number;
  onRefresh: () => void;
}

function formatCountdown(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

export const Header: React.FC<HeaderProps> = ({ lastUpdated, timeUntilRefresh, onRefresh }) => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="header-title">
          <h1>Monitor de Câmbio</h1>
          <p className="header-subtitle">USD · EUR · BRL — Atualização a cada hora</p>
        </div>
        <div className="header-actions">
          {lastUpdated && (
            <span className="last-updated">
              Atualizado: {lastUpdated.toLocaleTimeString('pt-BR')}
            </span>
          )}
          <span className="countdown">
            Próxima atualização: {formatCountdown(timeUntilRefresh)}
          </span>
          <button className="refresh-btn" onClick={onRefresh}>
            Atualizar
          </button>
        </div>
      </div>
    </header>
  );
};
