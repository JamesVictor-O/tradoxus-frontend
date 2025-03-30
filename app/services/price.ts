import { PriceData } from '../types/price';

export async function fetchPriceData(timeRange: string, currency: string): Promise<PriceData[]> {
  try {
    // In a real application, this would be an API call to a price data provider
    // For now, we'll return mock data
    const mockData: PriceData[] = [
      { date: '2024-03-10', price: 0.12, volume: 450000, change24h: 2.5 },
      { date: '2024-03-09', price: 0.118, volume: 380000, change24h: -1.2 },
      { date: '2024-03-08', price: 0.121, volume: 420000, change24h: 1.8 },
      { date: '2024-03-07', price: 0.119, volume: 390000, change24h: -0.5 },
      { date: '2024-03-06', price: 0.122, volume: 410000, change24h: 3.2 },
      { date: '2024-03-05', price: 0.117, volume: 350000, change24h: -2.1 },
      { date: '2024-03-04', price: 0.120, volume: 400000, change24h: 1.5 },
    ];

    return mockData;
  } catch (error) {
    console.error('Error fetching price data:', error);
    throw new Error('Failed to fetch price data');
  }
}

export async function fetchHistoricalPrices(
  symbol: string = 'XLM',
  currency: string = 'USD',
  days: number = 7
): Promise<PriceData[]> {
  try {
    // This would be replaced with a real API call in production
    const mockHistoricalData: PriceData[] = [
      { date: '2024-03-10', price: 0.12, volume: 450000, change24h: 2.5 },
      { date: '2024-03-03', price: 0.115, volume: 380000, change24h: 1.2 },
      { date: '2024-02-24', price: 0.113, volume: 420000, change24h: -0.8 },
      { date: '2024-02-17', price: 0.114, volume: 390000, change24h: 0.5 },
      { date: '2024-02-10', price: 0.112, volume: 410000, change24h: -1.2 },
      { date: '2024-02-03', price: 0.116, volume: 350000, change24h: 2.1 },
      { date: '2024-01-27', price: 0.111, volume: 400000, change24h: -0.5 },
    ];

    return mockHistoricalData;
  } catch (error) {
    console.error('Error fetching historical prices:', error);
    throw new Error('Failed to fetch historical price data');
  }
}

export async function fetchMarketStats(): Promise<{
  price: number;
  volume24h: number;
  marketCap: number;
  change24h: number;
}> {
  try {
    // This would be replaced with a real API call in production
    return {
      price: 0.12,
      volume24h: 450000,
      marketCap: 3200000000,
      change24h: 2.5,
    };
  } catch (error) {
    console.error('Error fetching market stats:', error);
    throw new Error('Failed to fetch market statistics');
  }
} 