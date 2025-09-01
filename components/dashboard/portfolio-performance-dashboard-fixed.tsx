'use client'

import { useState, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Area, AreaChart, XAxis, YAxis, CartesianGrid } from 'recharts'
import { FileText, FileSpreadsheet, TrendingUp, TrendingDown } from 'lucide-react'

// Mock crypto data for demonstration
const mockCryptoData = [
  {
    symbol: 'BTC',
    name: 'Bitcoin',
    holdings: 0.5,
    value: 23254.685,
    change24h: 0.92,
    pnl: 10.74,
    color: '#3b82f6',
    price: 46509.37
  },
  {
    symbol: 'ETH',
    name: 'Ethereum',
    holdings: 5,
    value: 15764.27,
    change24h: -4.43,
    pnl: 5.10,
    color: '#ef4444',
    price: 3152.85
  },
  {
    symbol: 'ADA',
    name: 'Cardano',
    holdings: 1000,
    value: 850.209,
    change24h: 7.23,
    pnl: 6.28,
    color: '#f97316',
    price: 0.85
  },
  {
    symbol: 'DOT',
    name: 'Polkadot',
    holdings: 200,
    value: 3684.841,
    change24h: -3.08,
    pnl: 8.38,
    color: '#8b5cf6',
    price: 18.42
  },
  {
    symbol: 'LINK',
    name: 'Chainlink',
    holdings: 150,
    value: 4435.582,
    change24h: 5.60,
    pnl: 18.28,
    color: '#10b981',
    price: 29.57
  }
]

const timeRanges = ['1D', '1W', '1M', '1Y']

// Mock portfolio data
const mockPortfolioData = {
  totalValue: 47989.587,
  totalChange: 9.19,
  cashBalance: 10000,
  riskMetrics: {
    volatility: 48.08,
    maxDrawdown: -23.17,
    sharpeRatio: 1.43,
    beta: 0.55
  }
}

// Generate historical data for the portfolio value chart
const generateHistoricalData = () => {
  const data = []
  const baseValue = 45000
  for (let i = 29; i >= 0; i--) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    const randomChange = (Math.random() - 0.5) * 0.1 // ±5% daily change
    const value = baseValue * (1 + randomChange * (30 - i) / 30)
    data.push({
      date: date.toISOString().split('T')[0],
      value: Math.max(value, baseValue * 0.8) // Prevent going too low
    })
  }
  return data
}

export function PortfolioPerformanceDashboardFixed() {
  const [selectedTimeRange, setSelectedTimeRange] = useState('1D')
  const [lastUpdated, setLastUpdated] = useState(new Date().toLocaleTimeString())
  const [historicalData] = useState(generateHistoricalData())
  const [portfolioData, setPortfolioData] = useState(mockPortfolioData)

  // Update last updated time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdated(new Date().toLocaleTimeString())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  // Simulate real-time data updates
  useEffect(() => {
    const updateInterval = setInterval(() => {
      // Simulate small price changes
      setPortfolioData(prev => ({
        ...prev,
        totalValue: prev.totalValue + (Math.random() - 0.5) * 100,
        totalChange: prev.totalChange + (Math.random() - 0.5) * 0.1
      }))
    }, 5000) // Update every 5 seconds

    return () => clearInterval(updateInterval)
  }, [])

  const formatCurrency = (value: number) => {
    return value.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 3
    })
  }

  const formatPercentage = (value: number) => {
    return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`
  }

  const handleExportCSV = () => {
    // In a real app, this would generate and download a CSV file
    console.log('Exporting CSV...')
  }

  const handleExportPDF = () => {
    // In a real app, this would generate and download a PDF file
    console.log('Exporting PDF...')
  }

  // Prepare data for pie chart
  const pieData = mockCryptoData.map(asset => ({
    name: asset.symbol,
    value: asset.value,
    color: asset.color
  }))

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 bg-purple-600 rounded flex items-center justify-center">
            <span className="text-white font-bold text-sm">P</span>
          </div>
          <h1 className="text-3xl font-bold">Portfolio Performance Dashboard</h1>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-green-400 text-sm">
            Last updated: {lastUpdated}
          </span>
          <Button
            onClick={handleExportCSV}
            className="bg-green-600 hover:bg-green-700 text-white"
            size="sm"
          >
            <FileSpreadsheet className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
          <Button
            onClick={handleExportPDF}
            className="bg-red-600 hover:bg-red-700 text-white"
            size="sm"
          >
            <FileText className="w-4 h-4 mr-2" />
            Export PDF
          </Button>
        </div>
      </div>

      {/* Top Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Total Portfolio Value */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Total Portfolio Value</CardTitle>
            <div className="flex gap-2 mt-4">
              {timeRanges.map((range) => (
                <Button
                  key={range}
                  variant={selectedTimeRange === range ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedTimeRange(range)}
                  className={selectedTimeRange === range ? "bg-blue-600" : "border-gray-600 text-gray-300"}
                >
                  {range}
                </Button>
              ))}
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-green-400 mb-2">
              ${formatCurrency(portfolioData.totalValue)}
            </div>
            <div className="text-green-400 text-lg">
              {formatPercentage(portfolioData.totalChange)}
            </div>
            <div className="mt-4 text-sm text-gray-400">
              Cash Balance: ${formatCurrency(portfolioData.cashBalance)}
            </div>
          </CardContent>
        </Card>

        {/* Asset Allocation */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Asset Allocation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: number) => [`$${formatCurrency(value)}`, 'Value']}
                    contentStyle={{
                      backgroundColor: '#1f2937',
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      color: '#f3f4f6'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap gap-4 mt-4">
              {mockCryptoData.map((asset) => (
                <div key={asset.symbol} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: asset.color }}
                  />
                  <span className="text-sm text-gray-300">
                    {asset.symbol}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Portfolio Value Chart */}
      <Card className="bg-gray-800 border-gray-700 mb-8">
        <CardHeader>
          <CardTitle className="text-white">Portfolio Value Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={historicalData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="date" 
                  stroke="#9ca3af"
                  tick={{ fill: '#9ca3af', fontSize: 12 }}
                />
                <YAxis 
                  stroke="#9ca3af"
                  tick={{ fill: '#9ca3af', fontSize: 12 }}
                  domain={['dataMin - 1000', 'dataMax + 1000']}
                />
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1f2937',
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#f3f4f6'
                  }}
                  formatter={(value: number) => [`$${formatCurrency(value)}`, 'Value']}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#10b981"
                  fillOpacity={1}
                  fill="url(#colorValue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Asset Performance Table */}
      <Card className="bg-gray-800 border-gray-700 mb-8">
        <CardHeader>
          <CardTitle className="text-white">Asset Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-gray-700">
                <TableHead className="text-gray-300">Asset</TableHead>
                <TableHead className="text-gray-300">Holdings</TableHead>
                <TableHead className="text-gray-300">Price</TableHead>
                <TableHead className="text-gray-300">Value</TableHead>
                <TableHead className="text-gray-300">24h Change</TableHead>
                <TableHead className="text-gray-300">P&L</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockCryptoData.map((asset) => (
                <TableRow key={asset.symbol} className="border-gray-700">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: asset.color }}
                      />
                      <div>
                        <div className="font-medium text-white">
                          {asset.symbol} {asset.name}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-300">
                    {asset.holdings.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-white font-medium">
                    ${formatCurrency(asset.price)}
                  </TableCell>
                  <TableCell className="text-white font-medium">
                    ${formatCurrency(asset.value)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      {asset.change24h >= 0 ? (
                        <TrendingUp className="w-4 h-4 text-green-400" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-red-400" />
                      )}
                      <span
                        className={asset.change24h >= 0 ? 'text-green-400' : 'text-red-400'}
                      >
                        {formatPercentage(asset.change24h)}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-green-400">
                    {formatPercentage(asset.pnl)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Risk Exposure Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-1">
                {portfolioData.riskMetrics.volatility}%
              </div>
              <div className="text-sm text-gray-400 uppercase tracking-wide">
                Volatility
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-400 mb-1">
                {portfolioData.riskMetrics.maxDrawdown}%
              </div>
              <div className="text-sm text-gray-400 uppercase tracking-wide">
                Max Drawdown
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-1">
                {portfolioData.riskMetrics.sharpeRatio}
              </div>
              <div className="text-sm text-gray-400 uppercase tracking-wide">
                Sharpe Ratio
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-1">
                {portfolioData.riskMetrics.beta}
              </div>
              <div className="text-sm text-gray-400 uppercase tracking-wide">
                Beta
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
