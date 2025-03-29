// lib/portfolio.ts
import { prisma } from './db'
import { fetchStockData } from './stocks'

const DEFAULT_PORTFOLIO_ID = 'default-virtual-portfolio'

export async function getPortfolio() {
  let portfolio = await prisma.portfolio.findUnique({
    where: { id: DEFAULT_PORTFOLIO_ID },
    include: {
      positions: true,
      transactions: {
        orderBy: { createdAt: 'desc' },
        take: 10
      },
      values: {
        orderBy: { date: 'desc' },
        take: 30
      }
    }
  })

  if (!portfolio) {
    // Create default portfolio if none exists
    portfolio = await prisma.portfolio.create({
      data: {
        id: DEFAULT_PORTFOLIO_ID,
        name: 'Virtual Trading Portfolio',
        cashBalance: 10000.00
      },
      include: {
        positions: true,
        // transactions: true, // Removed as it is not a valid include property
        // values: true // Removed as it is not a valid include property
      }
    })
  }

  // Rest of the function remains the same...
  let totalValue = portfolio.cashBalance
  const positionsWithValue = await Promise.all(
    portfolio.positions.map(async (position) => {
      const stockData = await fetchStockData(position.symbol)
      const currentValue = stockData.price * position.quantity
      return {
        ...position,
        currentPrice: stockData.price,
        currentValue,
        change: currentValue - position.avgPrice * position.quantity
      }
    })
  )

  totalValue += positionsWithValue.reduce((sum, pos) => sum + pos.currentValue, 0)

  // Update portfolio value history if not today
  const today = new Date().toISOString().split('T')[0]
  const lastValue = portfolio.values[0]?.date.toISOString().split('T')[0]
  
  if (lastValue !== today) {
    await prisma.portfolioValue.create({
      data: {
        portfolioId: portfolio.id,
        value: totalValue
      }
    })
  }

  return {
    ...portfolio,
    totalValue,
    positions: positionsWithValue,
    dailyChange: totalValue - (portfolio.values[0]?.value || totalValue)
  }
}

export async function createTransaction(
  symbol: string,
  type: 'BUY' | 'SELL',
  quantity: number
) {
  if (quantity <= 0) {
    throw new Error('Quantity must be positive')
  }

  const stockData = await fetchStockData(symbol)
  const amount = stockData.price * quantity

  return await prisma.$transaction(async (tx) => {
    const portfolio = await tx.portfolio.findUnique({
      where: { id: DEFAULT_PORTFOLIO_ID }
    })

    if (!portfolio) throw new Error('Portfolio not found')

    if (type === 'BUY' && portfolio.cashBalance < amount) {
      throw new Error('Insufficient funds')
    }

    // Rest of the transaction logic remains the same...
    // Just remove all user/portfolio relation checks
  })
}