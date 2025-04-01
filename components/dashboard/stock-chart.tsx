// components/dashboard/stock-chart.tsx
'use client'

import { useEffect, useState } from 'react'
import { LineChart } from 'recharts'
import {  Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {Button} from '../ui/button'

export function StockChart() {
  const [symbol, setSymbol] = useState('AAPL')
  const [chartData, setChartData] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const fetchChartData = async () => {
    if (!symbol) return
    
    setIsLoading(true)
    try {
      const response = await fetch(`/api/stocks?symbol=${symbol}`)
      const data = await response.json()
      setChartData(data.historical || [])
    } catch (error) {
      console.error('Error fetching chart data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchChartData()
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Stock Chart</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2 mb-4">
          <Input
            placeholder="Enter symbol"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value.toUpperCase())}
            onKeyDown={(e) => e.key === 'Enter' && fetchChartData()}
          />
          <Button onClick={fetchChartData} disabled={isLoading}>
            Load
          </Button>
        </div>

        {isLoading ? (
          <div className="h-64 flex items-center justify-center">Loading chart...</div>
        ) : chartData.length > 0 ? (
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={['auto', 'auto']} />
                <Tooltip />
                <Line type="monotone" dataKey="price" stroke="#8884d8" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="h-64 flex items-center justify-center text-muted-foreground">
            No chart data available
          </div>
        )}
      </CardContent>
    </Card>
  )
}