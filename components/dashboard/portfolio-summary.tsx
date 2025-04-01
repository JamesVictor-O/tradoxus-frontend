// components/dashboard/portfolio-summary.tsx
'use client'

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { usePortfolio } from '@/lib/hooks/use-portfolio'

export function PortfolioSummary() {
  const { portfolio, isLoading, error } = usePortfolio()

  if (isLoading) return <div>Loading...</div>
  
  // Enhanced error handling
  if (error) {
    const errorMessage = typeof error === 'object' && error !== null 
      ? 'message' in error 
        ? (error as {message: string}).message 
        : JSON.stringify(error)
      : String(error)
      
    return <div className="text-red-500">Error: {errorMessage}</div>
  }

  // Safely handle undefined portfolio
  if (!portfolio) {
    return <div className="text-yellow-500">Portfolio data not available</div>
  }

  // Formatting helper function
  const formatCurrency = (value: number | undefined) => {
    if (value === undefined) return 'N/A'
    return value.toLocaleString('en-US', { 
      minimumFractionDigits: 2, 
      maximumFractionDigits: 2 
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Portfolio Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Total Value</p>
            <p className="text-2xl font-bold">
              ${formatCurrency(portfolio.totalValue)}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Cash Balance</p>
            <p className="text-2xl font-bold">
              ${formatCurrency(portfolio.cashBalance)}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Daily Change</p>
            <p className={`text-2xl font-bold ${
              (portfolio.dailyChange || 0) >= 0 ? 'text-green-500' : 'text-red-500'
            }`}>
              {portfolio.dailyChange !== undefined ? (
                <>
                  {(portfolio.dailyChange >= 0 ? '+' : '')}
                  {formatCurrency(portfolio.dailyChange)}
                </>
              ) : 'N/A'}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}