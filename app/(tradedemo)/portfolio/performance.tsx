'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { usePortfolio } from '@/lib/hooks/use-portfolio'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

export default function PerformancePage() {
  const { portfolio, isLoading, error } = usePortfolio()

  if (isLoading) return <div>Loading...</div>


  if (error) {
    let errorMessage = 'An unknown error occurred'
    try {
      if (error instanceof Error) {
        errorMessage = error.message
      } else if (typeof error === 'object' && error !== null) {
        errorMessage = JSON.stringify(error)
      } else {
        errorMessage = String(error)
      }
    } catch (e) {
      console.error('Error processing error message:', e)
    }
    
    return <div className="text-red-500">Error: {errorMessage}</div>
  }

  let chartData: {date: string; value: number}[] = []
  try {
    if (portfolio?.values && Array.isArray(portfolio.values)) {
      chartData = portfolio.values
        .map((value: any) => ({
          date: new Date(value.date).toLocaleDateString(),
          value: Number(value.value) || 0
        }))
        .reverse()
    }
  } catch (e) {
    console.error('Error processing chart data:', e)
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Portfolio Performance</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Portfolio Value Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          {chartData.length > 0 ? (
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis domain={['auto', 'auto']} />
                  <Tooltip
                    formatter={(value: number) => [`$${value.toFixed(2)}`, 'Portfolio Value']}
                    labelFormatter={(label) => `Date: ${label}`}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#8884d8"
                    dot={false}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <p>No performance data available yet.</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}