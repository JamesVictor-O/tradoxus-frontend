"use client";

import { useState, useEffect } from 'react';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  ComposedChart,
  Area
} from 'recharts';
import { Calendar, Clock, DollarSign, BarChart2, Sun, Moon } from 'lucide-react';
import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";
import { Skeleton } from "@/app/components/ui/skeleton";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/app/components/ui/select";
import { fetchPriceData } from "@/app/services/price";
import { useTheme } from '@/app/contexts/theme-context';

interface PriceData {
  date: string;
  price: number;
  volume: number;
  change24h: number;
}

interface ChartState {
  timeRange: '24h' | '7d' | '30d' | '1y' | 'all';
  currency: 'USD' | 'EUR' | 'GBP';
  theme: 'dark' | 'light';
}

const movingAveragesData = [
  { date: '2023-01', price: 0.085, ma7: 0.082, ma30: 0.080 },
  { date: '2023-03', price: 0.088, ma7: 0.087, ma30: 0.083 },
  { date: '2023-05', price: 0.092, ma7: 0.090, ma30: 0.086 },
  { date: '2023-07', price: 0.095, ma7: 0.094, ma30: 0.089 },
  { date: '2023-09', price: 0.105, ma7: 0.102, ma30: 0.093 },
  { date: '2023-11', price: 0.098, ma7: 0.100, ma30: 0.095 },
  { date: '2024-01', price: 0.112, ma7: 0.108, ma30: 0.098 },
  { date: '2024-03', price: 0.108, ma7: 0.110, ma30: 0.100 },
];

const volumeData = [
  { date: '2023-01', volume: 200000 },
  { date: '2023-03', volume: 250000 },
  { date: '2023-05', volume: 230000 },
  { date: '2023-07', volume: 280000 },
  { date: '2023-09', volume: 320000 },
  { date: '2023-11', volume: 350000 },
  { date: '2024-01', volume: 380000 },
  { date: '2024-03', volume: 420000 },
  { date: '2023-01', volume: 200000 },
  { date: '2023-03', volume: 250000 },
  { date: '2023-05', volume: 230000 },
  { date: '2023-07', volume: 280000 },
  { date: '2023-09', volume: 320000 },
  { date: '2023-11', volume: 350000 },
  { date: '2024-01', volume: 380000 },
  { date: '2024-03', volume: 420000 }
];


export function usePriceData(timeRange: string, currency: string) {
  const [data, setData] = useState<PriceData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        setIsLoading(true);
        const data = await fetchPriceData(timeRange, currency);
        setData(data);
        setError(null);
      } catch (err) {
        setError('Failed to load price data');
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, [timeRange, currency]);

  return { data, isLoading, error };
}

export default function StellarPriceChart() {
  const { theme, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState('Moving Averages');
  const [expandedSection, setExpandedSection] = useState<string>('');
  const [chartState, setChartState] = useState<ChartState>({
    timeRange: '7d',
    currency: 'USD',
    theme: 'dark'
  });

  const { data: priceData, isLoading: isPriceLoading, error: priceError } = usePriceData(
    chartState.timeRange,
    chartState.currency
  );

  const isDark = theme === 'dark';
  const chartColors = {
    background: isDark ? '#1a1a1a' : '#ffffff',
    text: isDark ? '#ffffff' : '#1a1a1a',
    grid: isDark ? '#333333' : '#cbd5e1',
    border: isDark ? '#374151' : '#94a3b8',
    price: '#00ff9d',
    ma7: '#ff6b6b',
    ma30: '#4a9eff',
    volume: '#F7931A',
  };

  const renderChart = () => {
    if (isPriceLoading) {
      return (
        <div className="flex items-center justify-center h-full">
          <Skeleton className="w-full h-full" />
        </div>
      );
    }

    if (priceError) {
      return (
        <div className="flex items-center justify-center h-full text-red-500">
          Failed to load price data
        </div>
      );
    }

    switch (activeTab) {
      case 'Moving Averages':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={movingAveragesData}>
              <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} vertical={false} />
              <XAxis 
                dataKey="date" 
                stroke={chartColors.text}
                tick={{ fill: chartColors.text }}
              />
              <YAxis 
                stroke={chartColors.text}
                tick={{ fill: chartColors.text }}
                domain={['auto', 'auto']}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: chartColors.background,
                  border: `1px solid ${chartColors.border}`,
                  borderRadius: '4px',
                  color: chartColors.text
                }}
              />
              <Line 
                type="monotone"
                dataKey="price"
                stroke={chartColors.price}
                strokeWidth={2}
                dot={false}
              />
              <Line 
                type="monotone"
                dataKey="ma7"
                stroke={chartColors.ma7}
                strokeWidth={2}
                dot={false}
              />
              <Line 
                type="monotone"
                dataKey="ma30"
                stroke={chartColors.ma30}
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        );
      case 'Price':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={priceData}>
              <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
              <XAxis 
                dataKey="date" 
                stroke={chartColors.text}
                tick={{ fill: chartColors.text }}
              />
              <YAxis 
                stroke={chartColors.text}
                tick={{ fill: chartColors.text }}
                domain={['auto', 'auto']}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: chartColors.background,
                  border: `1px solid ${chartColors.border}`,
                  borderRadius: '4px',
                  color: chartColors.text
                }}
              />
              <Line 
                type="monotone"
                dataKey="price"
                stroke={chartColors.price}
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        );
      case 'Volume':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={priceData}>
              <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
              <XAxis 
                dataKey="date" 
                stroke={chartColors.text}
                tick={{ fill: chartColors.text }}
              />
              <YAxis 
                stroke={chartColors.text}
                tick={{ fill: chartColors.text }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: chartColors.background,
                  border: `1px solid ${chartColors.border}`,
                  borderRadius: '4px',
                  color: chartColors.text
                }}
              />
              <Bar 
                dataKey="volume" 
                fill={chartColors.volume}
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        );
      default:
        return null;
    }
  };
  const getAnalysisText = () => {
    switch (activeTab) {
      case 'Moving Averages':
        return {
          title: "Current View: Moving Averages Analysis",
          description: "Moving averages help identify trends by smoothing out price fluctuations. The crossing of different MAs can signal potential trend changes."
        };
      case 'Volume':
        return {
          title: "Current View: Volume Analysis",
          description: "Volume indicates the level of trading activity. High volume often confirms strong price movements."
        };
      case 'Price':
        return {
          title: "Current View: Price Analysis",
          description: "Price chart shows the raw market value of XLM over time. Look for key support and resistance levels."
        };
      default:
        return {
          title: "Select a View",
          description: "Choose a chart type to view analysis"
        };
    }
  };

  const analysis = getAnalysisText();

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <Card className="bg-background border-border p-3">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{label}</span>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              <span>${payload[0].value.toFixed(4)}</span>
            </div>
            {payload[0].payload.change24h && (
              <div className={`flex items-center gap-2 ${
                payload[0].payload.change24h >= 0 ? 'text-green-500' : 'text-red-500'
              }`}>
                <span>{payload[0].payload.change24h.toFixed(2)}%</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <BarChart2 className="w-4 h-4" />
              <span>Vol: ${(payload[0].payload.volume).toLocaleString()}</span>
            </div>
          </div>
        </Card>
      );
    }
    return null;
  };

  return (
    <>
      <div className={`grid lg:grid-cols-[1fr_400px] md:grid-cols-1 gap-4 ${
        isDark ? 'bg-[#121212] text-white' : 'bg-white text-gray-800'
      } p-4 md:p-6`}>
        <div className={`border ${
          isDark ? 'border-gray-800' : 'border-gray-300'
        } rounded-lg p-3 md:p-4`}>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
            <div className="flex items-center gap-2">
              <img 
                src="/chart.png" 
                alt="chart" 
                className={`w-6 h-6 ${isDark ? 'invert' : 'opacity-80'}`}
              /> 
              <h2 className="text-lg md:text-xl font-semibold">Stellar (XLM) Price Chart</h2>
            </div>
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full ${
                isDark 
                  ? 'hover:bg-gray-800 text-gray-200' 
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
          
          <span className={`text-sm ${
            isDark ? 'text-gray-400' : 'text-gray-700'
          }`}>
            Interactive chart showing Stellar price movements and key indicators
          </span>

          <div className="flex flex-wrap gap-2 sm:gap-4 mb-6 mt-4">
            {['Price', 'Moving Averages', 'Volume'].map((tab) => (
              <button 
                key={tab}
                className={`px-3 sm:px-4 py-2 rounded transition-colors text-sm sm:text-base ${
                  activeTab === tab 
                    ? `bg-transparent border-2 ${isDark ? 'border-gray-500' : 'border-gray-600 text-gray-800'}` 
                    : `${isDark ? 'bg-gray-700 text-gray-200' : 'bg-gray-200 text-gray-700'} border border-transparent`
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className={`h-[300px] sm:h-[400px] rounded-lg p-2 sm:p-4 ${
            isDark ? 'bg-[#1a1a1a]' : 'bg-gray-50'
          }`}>
            {renderChart()}
          </div>

          <div className="flex flex-col sm:flex-row justify-between gap-4 mt-4">
            <button className={`px-4 py-2 bg-transparent border-2 rounded transition-colors text-sm sm:text-base ${
              isDark ? 'border-gray-500 hover:bg-gray-700/30' : 'border-gray-400 text-gray-700 hover:bg-gray-100'
            }`}>
              Download Data
            </button>
            <button className={`px-4 py-2 bg-transparent border-2 rounded transition-colors text-sm sm:text-base ${
              isDark ? 'border-gray-500 hover:bg-gray-700/30' : 'border-gray-400 text-gray-700 hover:bg-gray-100'
            }`}>
              Share Chart
            </button>
          </div>
        </div>

        <div className={`border ${
          isDark ? 'border-gray-800' : 'border-gray-300'
        } rounded-lg p-3 md:p-4`}>
          <h3 className="text-base md:text-lg font-semibold mb-4">Chart Analysis Tools</h3>
          <p className={`text-sm mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Learn how to use these tools to analyze Stellar trends
          </p>

          <div className="mb-6">
            <h4 className="font-medium mb-2">{analysis.title}</h4>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {analysis.description}
            </p>
          </div>

          <div className={`mb-6 p-3 sm:p-4 rounded-lg ${
            isDark ? 'bg-gray-800/30' : 'bg-gray-100'
          }`}>
            <h4 className="font-medium mb-3 flex items-center gap-2">
              <img 
                src="/trend.png" 
                alt="chart" 
                className={`w-5 h-5 ${isDark ? 'invert' : 'opacity-80'}`}
              /> 
              Key Indicators
            </h4>
            <ul className="space-y-2 text-sm sm:text-base">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                <span className={isDark ? '' : 'text-gray-700'}>Price: Current market value of XLM</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                <span className={isDark ? '' : 'text-gray-700'}>7-Day MA: Short-term trend indicator</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                <span className={isDark ? '' : 'text-gray-700'}>30-Day MA: Long-term trend indicator</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                <span className={isDark ? '' : 'text-gray-700'}>Volume: Trading activity level</span>
              </li>
            </ul>
          </div>

          <button className={`w-full py-2 rounded-lg transition-colors flex items-center justify-center gap-2 ${
            isDark 
              ? 'bg-gray-800 text-white hover:bg-gray-700' 
              : 'bg-gray-700 text-white hover:bg-gray-600'
          }`}>
            <img 
              src="/book.png" 
              alt="chart" 
              className="w-6 h-6 invert"
            /> 
            Start Trading Course
          </button>
        </div>
      </div>

      <div className={`${isDark ? 'bg-[#121212]' : 'bg-gray-100'} p-4 md:p-6`}>
        <div className={`border ${isDark ? 'border-gray-800' : 'border-gray-300'} rounded-lg p-4 md:p-6 ${
          isDark ? 'text-white' : 'text-gray-800'
        }`}>
          <h2 className="text-lg md:text-xl font-semibold flex items-center gap-2 mb-4">
            Understanding Stellar (XLM) Trading Trends
          </h2>
          <p className={`text-sm mb-6 ${isDark ? 'text-gray-400' : 'text-gray-700'}`}>
            A comprehensive guide to analyzing and interpreting Stellar market movements
          </p>

          <div className="space-y-2">
            <div className={`border ${isDark ? 'border-gray-800' : 'border-gray-300'} rounded-lg`}>
              <button 
                className={`w-full px-4 py-3 flex items-center justify-between transition-colors rounded-lg ${
                  isDark 
                    ? 'hover:bg-gray-800/50 text-white' 
                    : 'hover:bg-gray-100 text-gray-800'
                }`}
                onClick={() => setExpandedSection(expandedSection === 'stellar-info' ? '' : 'stellar-info')}
              >
                <div className="flex items-center gap-2">
                  <img 
                    src="/information.png" 
                    alt="info" 
                    className={`w-5 h-5 ${isDark ? 'invert' : 'opacity-90'}`}
                  />
                  <span>What is Stellar (XLM)?</span>
                </div>
                <svg className={`w-5 h-5 ${isDark ? 'text-white' : 'text-gray-700'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {expandedSection === 'stellar-info' && (
                <div className={`px-4 py-3 border-t ${isDark ? 'border-gray-800' : 'border-gray-300'}`}>
                  <h4 className="font-medium mb-2">What is Stellar (XLM)?</h4>
                  <p className={`text-sm mb-4 ${isDark ? 'text-gray-400' : 'text-gray-700'}`}>
                    Stellar (XLM) is a decentralized protocol for transferring digital currency to fiat money across borders. 
                    Stellar aims to facilitate cross-border transactions between any currencies. 
                    It was created by the Stellar Development Foundation, which aims to promote financial inclusion and provide access to financial services for the unbanked.
                  </p>
                </div>
              )}
            </div>

            <div className={`border ${isDark ? 'border-gray-800' : 'border-gray-300'} rounded-lg`}>
              <button 
                className={`w-full px-4 py-3 flex items-center justify-between transition-colors rounded-lg ${
                  isDark 
                    ? 'hover:bg-gray-800/50 text-white' 
                    : 'hover:bg-gray-100 text-gray-800'
                }`}
                onClick={() => setExpandedSection(expandedSection === 'price-charts' ? '' : 'price-charts')}
              >
                <div className="flex items-center gap-2">
                  <img 
                    src="/chart.png" 
                    alt="chart" 
                    className={`w-5 h-5 ${isDark ? 'invert' : 'opacity-90'}`}
                  />
                  <span>How to Read Price Charts</span>
                </div>
                <svg 
                  className={`w-5 h-5 transform transition-transform ${expandedSection === 'price-charts' ? 'rotate-180' : ''} ${
                    isDark ? 'text-white' : 'text-gray-700'
                  }`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {expandedSection === 'price-charts' && (
                <div className={`px-4 py-3 border-t ${isDark ? 'border-gray-800' : 'border-gray-300'}`}>
                  <p className={`text-sm mb-4 ${isDark ? 'text-gray-400' : 'text-gray-700'}`}>
                    Price charts display the historical price movement of Stellar over time. When analyzing price charts, look for:
                  </p>
                  <ul className={`space-y-3 text-sm ${isDark ? 'text-gray-400' : 'text-gray-700'}`}>
                    <li className="flex items-start gap-2">
                      <span className={`w-2 h-2 ${isDark ? 'bg-gray-400' : 'bg-gray-500'} rounded-full mt-2`}></span>
                      <span><strong>Trends:</strong> Uptrends (series of higher highs and higher lows) indicate bullish momentum, while downtrends (series of lower highs and lower lows) indicate bearish momentum.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className={`w-2 h-2 ${isDark ? 'bg-gray-400' : 'bg-gray-500'} rounded-full mt-2`}></span>
                      <span><strong>Support and Resistance:</strong> Price levels where the asset historically struggles to move below (support) or above (resistance).</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className={`w-2 h-2 ${isDark ? 'bg-gray-400' : 'bg-gray-500'} rounded-full mt-2`}></span>
                      <span><strong>Chart Patterns:</strong> Formations like head and shoulders, double tops/bottoms, or triangles that can signal potential price movements.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className={`w-2 h-2 ${isDark ? 'bg-gray-400' : 'bg-gray-500'} rounded-full mt-2`}></span>
                      <span><strong>Candlestick Patterns:</strong> Individual or groups of candlesticks that can indicate potential reversals or continuation of trends.</span>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            <div className={`border ${isDark ? 'border-gray-800' : 'border-gray-300'} rounded-lg`}>
              <button 
                className={`w-full px-4 py-3 flex items-center justify-between transition-colors rounded-lg ${
                  isDark 
                    ? 'hover:bg-gray-800/50 text-white' 
                    : 'hover:bg-gray-100 text-gray-800'
                }`}
                onClick={() => setExpandedSection(expandedSection === 'moving-averages' ? '' : 'moving-averages')}
              >
                <div className="flex items-center gap-2">
                  <img 
                    src="/trend.png" 
                    alt="trend" 
                    className={`w-5 h-5 ${isDark ? 'invert' : 'opacity-90'}`}
                  />
                  <span>Moving Averages Explained</span>
                </div>
                <svg 
                  className={`w-5 h-5 transform transition-transform ${expandedSection === 'moving-averages' ? 'rotate-180' : ''} ${
                    isDark ? 'text-white' : 'text-gray-700'
                  }`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {expandedSection === 'moving-averages' && (
                <div className={`px-4 py-3 border-t ${isDark ? 'border-gray-800' : 'border-gray-300'}`}>
                  <p className={`text-sm mb-4 ${isDark ? 'text-gray-400' : 'text-gray-700'}`}>
                    Moving averages (MAs) are one of the most popular and widely used technical indicators. They smooth out price data to create a single flowing line, making it easier to identify the direction of the trend.
                  </p>
                  <div className={`space-y-3 text-sm ${isDark ? 'text-gray-400' : 'text-gray-700'}`}>
                    <h5 className={isDark ? 'font-medium text-white' : 'font-medium text-gray-900'}>Key Moving Average Signals:</h5>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2">
                        <span className={`w-2 h-2 ${isDark ? 'bg-white' : 'bg-gray-700'} rounded-full mt-2`}></span>
                        <span><strong>Golden Cross:</strong> When a shorter-term MA (like the 7-day) crosses above a longer-term MA (like the 30-day), it's considered a bullish signal.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className={`w-2 h-2 ${isDark ? 'bg-white' : 'bg-gray-700'} rounded-full mt-2`}></span>
                        <span><strong>Death Cross:</strong> When a shorter-term MA crosses below a longer-term MA, it's considered a bearish signal.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className={`w-2 h-2 ${isDark ? 'bg-white' : 'bg-gray-700'} rounded-full mt-2`}></span>
                        <span><strong>Price/MA Relationship:</strong> When price is above the MA, the trend is generally considered bullish; when below, it's considered bearish.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className={`w-2 h-2 ${isDark ? 'bg-white' : 'bg-gray-700'} rounded-full mt-2`}></span>
                        <span><strong>MA as Support/Resistance:</strong> MAs often act as dynamic support or resistance levels where price may bounce or reverse.</span>
                      </li>
                    </ul>
                    <p className={`mt-4 ${isDark ? 'text-gray-400' : 'text-gray-700'}`}>
                      In our chart, the 7-day MA (blue line) responds more quickly to recent price changes, while the 30-day MA (green line) shows the longer-term trend direction.
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className={`border ${isDark ? 'border-gray-800' : 'border-gray-300'} rounded-lg`}>
              <button 
                className={`w-full px-4 py-3 flex items-center justify-between transition-colors rounded-lg ${
                  isDark 
                    ? 'hover:bg-gray-800/50 text-white' 
                    : 'hover:bg-gray-100 text-gray-800'
                }`}
                onClick={() => setExpandedSection(expandedSection === 'volume' ? '' : 'volume')}
              >
                <div className="flex items-center gap-2">
                  <img 
                    src="/down-arrow.png" 
                    alt="volume" 
                    className={`w-5 h-5 ${isDark ? 'invert' : 'opacity-90'}`}
                  />
                  <span>Volume Analysis</span>
                </div>
                <svg 
                  className={`w-5 h-5 transform transition-transform ${expandedSection === 'volume' ? 'rotate-180' : ''} ${
                    isDark ? 'text-white' : 'text-gray-700'
                  }`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {expandedSection === 'volume' && (
                <div className={`px-4 py-3 border-t ${isDark ? 'border-gray-800' : 'border-gray-300'}`}>
                  <p className={`text-sm mb-4 ${isDark ? 'text-gray-400' : 'text-gray-700'}`}>
                    Volume represents the total amount of a cryptocurrency that has been traded during a specific time period. It's a crucial indicator that can confirm trends and signal potential reversals.
                  </p>
                  <div className={`space-y-3 text-sm ${isDark ? 'text-gray-400' : 'text-gray-700'}`}>
                    <h5 className={isDark ? 'font-medium text-white' : 'font-medium text-gray-900'}>Key Volume Principles:</h5>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2">
                        <span className={`w-2 h-2 ${isDark ? 'bg-white' : 'bg-gray-700'} rounded-full mt-2`}></span>
                        <span><strong>Trend Confirmation:</strong> In an uptrend, volume should increase as price rises and decrease as price falls. In a downtrend, volume should increase as price falls and decrease as price rises.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className={`w-2 h-2 ${isDark ? 'bg-white' : 'bg-gray-700'} rounded-full mt-2`}></span>
                        <span><strong>Breakouts:</strong> A price breakout accompanied by high volume is more likely to be sustained than one with low volume.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className={`w-2 h-2 ${isDark ? 'bg-white' : 'bg-gray-700'} rounded-full mt-2`}></span>
                        <span><strong>Divergence:</strong> If price makes a new high but volume is lower than during the previous high, this can signal weakness in the trend (bearish divergence). Conversely, if price makes a new low but volume is lower than during the previous low, this can signal strength (bullish divergence).</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className={`w-2 h-2 ${isDark ? 'bg-white' : 'bg-gray-700'} rounded-full mt-2`}></span>
                        <span><strong>Volume Spikes:</strong> Sudden, dramatic increases in volume often indicate a potential reversal point or the beginning of a new trend.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>

            <div className={`border ${isDark ? 'border-gray-800' : 'border-gray-300'} rounded-lg`}>
              <button 
                className={`w-full px-4 py-3 flex items-center justify-between transition-colors rounded-lg ${
                  isDark 
                    ? 'hover:bg-gray-800/50 text-white' 
                    : 'hover:bg-gray-100 text-gray-800'
                }`}
                onClick={() => setExpandedSection(expandedSection === 'stellar-specific' ? '' : 'stellar-specific')}
              >
                <div className="flex items-center gap-2">
                  <img 
                    src="/information.png" 
                    alt="chart" 
                    className={`w-5 h-5 ${isDark ? 'invert' : 'opacity-90'}`}
                  />
                  <span>Stellar-Specific Trading Considerations</span>
                </div>
                <svg 
                  className={`w-5 h-5 transform transition-transform ${expandedSection === 'stellar-specific' ? 'rotate-180' : ''} ${
                    isDark ? 'text-white' : 'text-gray-700'
                  }`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {expandedSection === 'stellar-specific' && (
                <div className={`px-4 py-3 border-t ${isDark ? 'border-gray-800' : 'border-gray-300'}`}>
                  <p className={`text-sm mb-4 ${isDark ? 'text-gray-400' : 'text-gray-700'}`}>
                    When trading Stellar (XLM), there are several unique factors to consider that can influence its price:
                  </p>
                  <div className={`space-y-3 text-sm ${isDark ? 'text-gray-400' : 'text-gray-700'}`}>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2">
                        <span className={`w-2 h-2 ${isDark ? 'bg-white' : 'bg-gray-700'} rounded-full mt-2`}></span>
                        <span><strong>Partnership Announcements:</strong> Stellar often forms partnerships with financial institutions and technology companies. These announcements can significantly impact XLM's price.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className={`w-2 h-2 ${isDark ? 'bg-white' : 'bg-gray-700'} rounded-full mt-2`}></span>
                        <span><strong>Regulatory News:</strong> As a cryptocurrency focused on cross-border payments and connecting to traditional financial systems, Stellar is particularly sensitive to regulatory developments.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className={`w-2 h-2 ${isDark ? 'bg-white' : 'bg-gray-700'} rounded-full mt-2`}></span>
                        <span><strong>Network Adoption:</strong> Increases in the number of transactions on the Stellar network or new projects building on Stellar can drive demand for XLM.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className={`w-2 h-2 ${isDark ? 'bg-white' : 'bg-gray-700'} rounded-full mt-2`}></span>
                        <span><strong>Correlation with Bitcoin:</strong> Like most altcoins, XLM often shows correlation with Bitcoin's price movements, though this correlation can vary in strength.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className={`w-2 h-2 ${isDark ? 'bg-white' : 'bg-gray-700'} rounded-full mt-2`}></span>
                        <span><strong>Supply Dynamics:</strong> The Stellar Development Foundation controls a significant portion of the XLM supply, and their distribution decisions can affect the market.</span>
                      </li>
                    </ul>
                    <p className={`mt-4 ${isDark ? 'text-gray-400' : 'text-gray-700'}`}>
                      Always combine technical analysis with fundamental analysis of these factors for a more complete trading strategy.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
