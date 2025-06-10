export interface Trade {
  id: string;
  symbol: string;
  side: 'Long' | 'Short';
  entryPrice: number;
  exitPrice: number;
  quantity: number;
  entryDate: string;
  exitDate: string;
  commission: number;
  strategy: string[];
  preTradeNotes: string;
  postTradeNotes: string;
  mistakes: string[];
  screenshots: string[];
  pnl: number;
  duration: number;
  isHidden: boolean; // Added for hide functionality
}

export interface DashboardMetrics {
  totalPnL: number;
  winRate: number;
  avgWinningTrade: number;
  avgLosingTrade: number;
  profitFactor: number;
  totalTrades: number;
  equityCurve: Array<{ date: string; value: number }>;
}

export interface newTrade {
  symbol: string
  side: 'Long' | 'Short'
  entryPrice: string
  exitPrice: string
  quantity: string
  entryDate: string
  exitDate: string
  commission: string
  strategy: string[]
  preTradeNotes: string
  postTradeNotes: string
  mistakes: string[]
}
