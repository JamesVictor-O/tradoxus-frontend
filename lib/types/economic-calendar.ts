export type EventImportance = 'High' | 'Medium' | 'Low';
export type EventType = 'GDP' | 'CPI' | 'Employment' | 'Interest Rate' | 'Trade Balance' | 'Retail Sales' | 'Manufacturing' | 'Other';
export type Currency = 'USD' | 'EUR' | 'GBP' | 'JPY' | 'CAD' | 'AUD' | 'CHF' | 'CNY';
export type Country = 'US' | 'EU' | 'UK' | 'JP' | 'CA' | 'AU' | 'CH' | 'CN' | 'DE' | 'FR' | 'IT' | 'ES';
export type CalendarView = 'monthly' | 'weekly' | 'daily';
export type AlertTime = '5min' | '15min' | '30min' | '1hour' | '1day';
export type AlertMethod = 'email' | 'push' | 'sms';

export interface EconomicEvent {
  id: string;
  title: string;
  description: string;
  date: Date;
  time: string;
  country: Country;
  currency: Currency;
  importance: EventImportance;
  eventType: EventType;
  previousValue?: string;
  forecastValue?: string;
  actualValue?: string;
  affectedAssets: string[];
  historicalImpact?: HistoricalImpact;
}

export interface HistoricalImpact {
  priceReaction: number; // percentage change
  volatilityImpact: number; // percentage change
  affectedAssets: string[];
  timeToRecovery: number; // hours
}

export interface CalendarFilter {
  dateRange: {
    start: Date;
    end: Date;
  };
  countries: Country[];
  importance: EventImportance[];
  currencies: Currency[];
  eventTypes: EventType[];
}

export interface Alert {
  id: string;
  eventId: string;
  userId: string;
  notificationTime: AlertTime;
  deliveryMethod: AlertMethod;
  isActive: boolean;
  createdAt: Date;
}

export interface ImpactAnalysis {
  eventId: string;
  priceChart: Array<{ time: Date; price: number }>;
  volatilityChart: Array<{ time: Date; volatility: number }>;
  correlationMatrix: Record<string, Record<string, number>>;
  portfolioExposure: number;
}

export interface NotificationPreferences {
  email: boolean;
  push: boolean;
  sms: boolean;
  quietHours: {
    enabled: boolean;
    start: string;
    end: string;
  };
  importanceThreshold: EventImportance;
} 