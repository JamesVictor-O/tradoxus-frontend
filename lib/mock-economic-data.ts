import type { EconomicEvent, CalendarFilter, EventImportance } from './types/economic-calendar';

export const mockEconomicEvents: EconomicEvent[] = [
  {
    id: '1',
    title: 'US Non-Farm Payrolls',
    description: 'Employment change in the US excluding farm workers',
    date: new Date('2024-01-15'),
    time: '13:30',
    country: 'US',
    currency: 'USD',
    importance: 'High',
    eventType: 'Employment',
    previousValue: '173K',
    forecastValue: '180K',
    actualValue: '185K',
    affectedAssets: ['EUR/USD', 'USD/JPY', 'S&P 500', 'Gold'],
    historicalImpact: {
      priceReaction: 2.5,
      volatilityImpact: 15.2,
      affectedAssets: ['EUR/USD', 'USD/JPY'],
      timeToRecovery: 4
    }
  },
  {
    id: '2',
    title: 'ECB Interest Rate Decision',
    description: 'European Central Bank monetary policy decision',
    date: new Date('2024-01-16'),
    time: '14:45',
    country: 'EU',
    currency: 'EUR',
    importance: 'High',
    eventType: 'Interest Rate',
    previousValue: '4.50%',
    forecastValue: '4.50%',
    affectedAssets: ['EUR/USD', 'EUR/GBP', 'DAX', 'Bund'],
    historicalImpact: {
      priceReaction: 1.8,
      volatilityImpact: 12.5,
      affectedAssets: ['EUR/USD', 'DAX'],
      timeToRecovery: 6
    }
  },
  {
    id: '3',
    title: 'UK CPI Inflation',
    description: 'Consumer Price Index for the United Kingdom',
    date: new Date('2024-01-17'),
    time: '09:30',
    country: 'UK',
    currency: 'GBP',
    importance: 'Medium',
    eventType: 'CPI',
    previousValue: '4.2%',
    forecastValue: '4.0%',
    affectedAssets: ['GBP/USD', 'GBP/EUR', 'FTSE 100'],
    historicalImpact: {
      priceReaction: 1.2,
      volatilityImpact: 8.7,
      affectedAssets: ['GBP/USD'],
      timeToRecovery: 3
    }
  },
  {
    id: '4',
    title: 'Japan GDP Growth',
    description: 'Gross Domestic Product growth rate for Japan',
    date: new Date('2024-01-18'),
    time: '23:50',
    country: 'JP',
    currency: 'JPY',
    importance: 'Medium',
    eventType: 'GDP',
    previousValue: '1.2%',
    forecastValue: '1.5%',
    affectedAssets: ['USD/JPY', 'EUR/JPY', 'Nikkei 225'],
    historicalImpact: {
      priceReaction: 0.9,
      volatilityImpact: 6.3,
      affectedAssets: ['USD/JPY'],
      timeToRecovery: 2
    }
  },
  {
    id: '5',
    title: 'Canada Employment Change',
    description: 'Employment change in Canada',
    date: new Date('2024-01-19'),
    time: '13:30',
    country: 'CA',
    currency: 'CAD',
    importance: 'Low',
    eventType: 'Employment',
    previousValue: '25K',
    forecastValue: '30K',
    affectedAssets: ['USD/CAD', 'EUR/CAD'],
    historicalImpact: {
      priceReaction: 0.6,
      volatilityImpact: 4.1,
      affectedAssets: ['USD/CAD'],
      timeToRecovery: 1
    }
  },
  {
    id: '6',
    title: 'Australia Retail Sales',
    description: 'Retail sales growth in Australia',
    date: new Date('2024-01-20'),
    time: '00:30',
    country: 'AU',
    currency: 'AUD',
    importance: 'Low',
    eventType: 'Retail Sales',
    previousValue: '0.2%',
    forecastValue: '0.3%',
    affectedAssets: ['AUD/USD', 'EUR/AUD'],
    historicalImpact: {
      priceReaction: 0.4,
      volatilityImpact: 3.2,
      affectedAssets: ['AUD/USD'],
      timeToRecovery: 1
    }
  },
  {
    id: '7',
    title: 'US CPI Inflation',
    description: 'Consumer Price Index for the United States',
    date: new Date('2024-01-22'),
    time: '13:30',
    country: 'US',
    currency: 'USD',
    importance: 'High',
    eventType: 'CPI',
    previousValue: '3.1%',
    forecastValue: '3.0%',
    affectedAssets: ['EUR/USD', 'USD/JPY', 'S&P 500', 'Gold', 'Treasury Bonds'],
    historicalImpact: {
      priceReaction: 3.2,
      volatilityImpact: 18.5,
      affectedAssets: ['EUR/USD', 'S&P 500', 'Gold'],
      timeToRecovery: 8
    }
  },
  {
    id: '8',
    title: 'Germany Manufacturing PMI',
    description: 'Purchasing Managers Index for German manufacturing',
    date: new Date('2024-01-23'),
    time: '08:30',
    country: 'DE',
    currency: 'EUR',
    importance: 'Medium',
    eventType: 'Manufacturing',
    previousValue: '45.8',
    forecastValue: '46.2',
    affectedAssets: ['EUR/USD', 'DAX', 'EUR/GBP'],
    historicalImpact: {
      priceReaction: 0.8,
      volatilityImpact: 5.4,
      affectedAssets: ['EUR/USD'],
      timeToRecovery: 2
    }
  }
];

export function getEventsForDateRange(startDate: Date, endDate: Date): EconomicEvent[] {
  return mockEconomicEvents.filter(event => 
    event.date >= startDate && event.date <= endDate
  );
}

export function getUpcomingEvents(count: number = 10): EconomicEvent[] {
  const now = new Date();
  return mockEconomicEvents
    .filter(event => event.date > now)
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .slice(0, count);
}

export function getHighImpactEvents(): EconomicEvent[] {
  return mockEconomicEvents.filter(event => event.importance === 'High');
}

export function filterEvents(events: EconomicEvent[], filters: CalendarFilter): EconomicEvent[] {
  return events.filter(event => {
    // Date range filter
    if (event.date < filters.dateRange.start || event.date > filters.dateRange.end) {
      return false;
    }
    
    // Country filter
    if (filters.countries.length > 0 && !filters.countries.includes(event.country)) {
      return false;
    }
    
    // Importance filter
    if (filters.importance.length > 0 && !filters.importance.includes(event.importance)) {
      return false;
    }
    
    // Currency filter
    if (filters.currencies.length > 0 && !filters.currencies.includes(event.currency)) {
      return false;
    }
    
    // Event type filter
    if (filters.eventTypes.length > 0 && !filters.eventTypes.includes(event.eventType)) {
      return false;
    }
    
    return true;
  });
} 