// components/dashboard/portfolio-summary.tsx
'use client'

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { usePortfolio } from '@/lib/hooks/use-portfolio'

export function PortfolioSummary() {
  const { portfolio, isLoading, error } = usePortfolio()

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Portfolio Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  // Enhanced error handling
  if (error) {
    const errorMessage = typeof error === 'object' && error !== null 
      ? 'message' in error 
        ? (error as {message: string}).message 
        : JSON.stringify(error)
      : String(error)
    
    return (
      <Card>
        <CardHeader>
          <CardTitle>Portfolio Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center p-6">
            <div className="text-center">
              <div className="text-red-500 text-sm font-medium mb-1">Error Loading Portfolio</div>
              <div className="text-red-400 text-xs">{errorMessage}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Safely handle undefined portfolio
  if (!portfolio) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Portfolio Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center p-6">
            <div className="text-yellow-500 text-sm font-medium">Portfolio data not available</div>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Formatting helper function
  const formatCurrency = (value: number | undefined) => {
    if (value === undefined) return 'N/A'
    return value.toLocaleString('en-US', { 
      minimumFractionDigits: 2,
      maximumFractionDigits: 2 
    })
  }

  // Portfolio metrics data
  const metrics = [
    {
      label: 'Total Value',
      value: portfolio.totalValue,
      prefix: '$',
      color: 'text-blue-600 dark:text-blue-400'
    },
    {
      label: 'Cash Balance',
      value: portfolio.cashBalance,
      prefix: '$',
      color: 'text-green-600 dark:text-green-400'
    },
    {
      label: 'Daily Change',
      value: portfolio.dailyChange,
      prefix: portfolio.dailyChange !== undefined && portfolio.dailyChange >= 0 ? '+$' : '$',
      color: (portfolio.dailyChange || 0) >= 0 ? 'text-green-500' : 'text-red-500'
    }
  ]

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg sm:text-xl">Portfolio Summary</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        {/* Responsive grid: 1 column on mobile, 2 on small screens, 3 on large screens */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {metrics.map((metric, index) => (
            <div 
              key={metric.label}
              className={`
                p-4 rounded-lg border border-gray-200 dark:border-gray-700 
                bg-gray-50/50 dark:bg-gray-800/50 
                hover:bg-gray-100/50 dark:hover:bg-gray-700/50 
                transition-colors duration-200
                ${index === 2 && 'sm:col-span-2 lg:col-span-1'}
              `}
            >
              <div className="space-y-1">
                <p className="text-xs sm:text-sm text-muted-foreground font-medium">
                  {metric.label}
                </p>
                <p className={`
                  text-xl sm:text-2xl lg:text-3xl font-bold 
                  ${metric.color}
                  truncate
                `}>
                  {metric.value !== undefined ? (
                    <>
                      {metric.prefix}{formatCurrency(Math.abs(metric.value))}
                    </>
                  ) : 'N/A'}
                </p>
                
                {/* Percentage change for daily change */}
                {metric.label === 'Daily Change' && portfolio.dailyChangePercent !== undefined && (
                  <p className={`
                    text-xs sm:text-sm font-medium
                    ${(portfolio.dailyChangePercent || 0) >= 0 ? 'text-green-500' : 'text-red-500'}
                  `}>
                    {portfolio.dailyChangePercent >= 0 ? '+' : ''}{portfolio.dailyChangePercent.toFixed(2)}%
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Additional metrics row for larger screens */}
        {(portfolio.totalPositions !== undefined || portfolio.dayTradingBuyingPower !== undefined) && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200 dark:border-gray-700">
            {portfolio.totalPositions !== undefined && (
              <div className="text-center sm:text-left">
                <p className="text-xs sm:text-sm text-muted-foreground font-medium mb-1">
                  Total Positions
                </p>
                <p className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100">
                  {portfolio.totalPositions}
                </p>
              </div>
            )}
            
            {portfolio.dayTradingBuyingPower !== undefined && (
              <div className="text-center sm:text-left">
                <p className="text-xs sm:text-sm text-muted-foreground font-medium mb-1">
                  Day Trading Power
                </p>
                <p className="text-lg sm:text-xl font-semibold text-purple-600 dark:text-purple-400">
                  ${formatCurrency(portfolio.dayTradingBuyingPower)}
                </p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}