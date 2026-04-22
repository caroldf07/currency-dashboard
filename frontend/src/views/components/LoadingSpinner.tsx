import React from 'react';

export const LoadingSpinner: React.FC = () => (
  <div className="loading-container" data-testid="loading-spinner">
    <div className="spinner"></div>
    <p>Carregando cotações...</p>
  </div>
);
