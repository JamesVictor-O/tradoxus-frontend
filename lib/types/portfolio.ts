// types/portfolio.ts
export interface PortfolioSummary {
    totalValue: number;
    cashBalance: number;
    dailyChange: number;
    totalReturn: number;
    positions: StockPosition[];
  }
  
  export interface StockPosition {
    symbol: string;
    quantity: number;
    averageCost: number;
    currentValue: number;
  }