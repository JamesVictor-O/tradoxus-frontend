import React, { createContext, useContext, useState, useEffect } from 'react';
import { PortfolioSummary, StockPosition } from '../type/portfolio';

interface PortfolioContextType {
  portfolio: PortfolioSummary;
  updatePortfolio: (newPortfolio: PortfolioSummary) => void;
  executeTrade: (symbol: string, quantity: number, type: 'BUY' | 'SELL') => Promise<void>;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [portfolio, setPortfolio] = useState<PortfolioSummary>({
    totalValue: 10000,
    cashBalance: 10000,
    dailyChange: 0,
    totalReturn: 0,
    positions: []
  });

  const updatePortfolio = (newPortfolio: PortfolioSummary) => {
    setPortfolio(newPortfolio);
  };

  const executeTrade = async (symbol: string, quantity: number, type: 'BUY' | 'SELL') => {
 
    const response = await fetch('/api/portfolio/trade', {
      method: 'POST',
      body: JSON.stringify({ symbol, quantity, type })
    });

    if (response.ok) {
      const updatedPortfolio = await response.json();
      updatePortfolio(updatedPortfolio);
    }
  };

  return (
    <PortfolioContext.Provider value={{ portfolio, updatePortfolio, executeTrade }}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
    const context = useContext(PortfolioContext);
    if (context === undefined) {
      throw new Error('usePortfolio must be used within a PortfolioProvider');
    }
    return context;
  };