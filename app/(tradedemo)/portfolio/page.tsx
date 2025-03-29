'use client'
import { PortfolioSummary } from '@/components/dashboard/portfolio-summary'
import { Watchlist } from '@/components/dashboard/watchlist'
import { OrderForm } from '@/components/dashboard/order-form'
import { StockChart } from '@/components/dashboard/stock-chart'
import { usePortfolio } from '@/lib/hooks/use-portfolio'

export default function PortfolioPage() {
  const { isLoading } = usePortfolio()

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading portfolio...</div>
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Virtual Trading Portfolio</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">

          <Watchlist />
        </div>
        <PortfolioSummary />
        
        <div className="space-y-8">
          <OrderForm />
          <StockChart />
        </div>
      </div>
    </div>
  )
}