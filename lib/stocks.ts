// lib/stocks.ts
import axios from 'axios'
import { prisma } from './db'

// Mock data for demonstration
const MOCK_STOCKS = [
  { symbol: 'AAPL', name: 'Apple Inc.', price: 185.32, change: 1.24, changePercent: 0.67 },
  { symbol: 'MSFT', name: 'Microsoft Corporation', price: 420.72, change: -2.15, changePercent: -0.51 },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 152.45, change: 0.85, changePercent: 0.56 },
  // Add more stocks...
]

const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

let cache: {
  [symbol: string]: {
    data: any
    timestamp: number
  }
} = {}

export async function fetchStockData(symbol: string) {
  // Check cache first
  if (cache[symbol] && Date.now() - cache[symbol].timestamp < CACHE_DURATION) {
    return cache[symbol].data
  }

  try {
    // In a real app, you would use a real API like Alpha Vantage, Yahoo Finance, etc.
    // const response = await axios.get(`https://api.example.com/stock/${symbol}`)
    // const data = response.data
    
    // For demo, use mock data
    const stock = MOCK_STOCKS.find(s => s.symbol === symbol)
    if (!stock) throw new Error('Stock not found')
    
    // Mock historical data
    const historical = Array.from({ length: 30 }, (_, i) => ({
      date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      price: stock.price + (Math.random() - 0.5) * 10
    }))

    const result = {
      ...stock,
      historical
    }

    // Update cache
    cache[symbol] = {
      data: result,
      timestamp: Date.now()
    }

    return result
  } catch (error) {
    console.error('Error fetching stock data:', error)
    throw error
  }
}

export async function searchStocks(query: string) {
  // In a real app, you would use an API
  // const response = await axios.get(`https://api.example.com/search?q=${query}`)
  
  // Mock search
  return MOCK_STOCKS.filter(stock =>
    stock.symbol.toLowerCase().includes(query.toLowerCase()) ||
    stock.name.toLowerCase().includes(query.toLowerCase())
  )
}