"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, TrendingDown, Target } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"

interface SimulationPerformanceProps {
  isSimulation: boolean
}

export function SimulationPerformance({ isSimulation }: SimulationPerformanceProps) {
  const performanceData = [
    { date: "2024-01-01", value: 100000, pnl: 0 },
    { date: "2024-01-02", value: 101250, pnl: 1250 },
    { date: "2024-01-03", value: 99800, pnl: -200 },
    { date: "2024-01-04", value: 102100, pnl: 2100 },
    { date: "2024-01-05", value: 103500, pnl: 3500 },
    { date: "2024-01-06", value: 102800, pnl: 2800 },
    { date: "2024-01-07", value: 104200, pnl: 4200 },
  ]

  const tradeHistory = [
    { symbol: "AAPL", type: "buy", quantity: 50, price: 150.0, pnl: 262.5, date: "2024-01-02" },
    { symbol: "GOOGL", type: "buy", quantity: 10, price: 2800.0, pnl: -500.0, date: "2024-01-03" },
    { symbol: "TSLA", type: "buy", quantity: 25, price: 220.0, pnl: 395.0, date: "2024-01-04" },
    { symbol: "MSFT", type: "sell", quantity: 30, price: 380.0, pnl: 450.0, date: "2024-01-05" },
  ]

  const monthlyPnL = [
    { month: "Jan", realized: 1200, unrealized: 800 },
    { month: "Feb", realized: -300, unrealized: 1500 },
    { month: "Mar", realized: 2100, unrealized: -200 },
    { month: "Apr", realized: 800, unrealized: 1200 },
  ]

  const totalRealizedPL = 3800
  const totalUnrealizedPL = 3300
  const totalPL = totalRealizedPL + totalUnrealizedPL
  const totalReturn = (totalPL / 100000) * 100

  if (!isSimulation) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-muted-foreground">
            <Target className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Switch to Simulation Mode to view performance analytics</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Performance Summary */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-blue-200 bg-blue-50/50 dark:border-blue-800 dark:bg-blue-950/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Total Return</p>
                <p className="text-2xl font-bold">{totalReturn.toFixed(2)}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Realized P&L</p>
                <p className={`text-2xl font-bold ${totalRealizedPL >= 0 ? "text-green-600" : "text-red-600"}`}>
                  ${totalRealizedPL.toLocaleString()}
                </p>
              </div>
              {totalRealizedPL >= 0 ? (
                <TrendingUp className="h-8 w-8 text-green-600" />
              ) : (
                <TrendingDown className="h-8 w-8 text-red-600" />
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Unrealized P&L</p>
                <p className={`text-2xl font-bold ${totalUnrealizedPL >= 0 ? "text-green-600" : "text-red-600"}`}>
                  ${totalUnrealizedPL.toLocaleString()}
                </p>
              </div>
              {totalUnrealizedPL >= 0 ? (
                <TrendingUp className="h-8 w-8 text-green-600" />
              ) : (
                <TrendingDown className="h-8 w-8 text-red-600" />
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Trades</p>
                <p className="text-2xl font-bold">{tradeHistory.length}</p>
              </div>
              <Target className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="performance" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="performance">Performance Chart</TabsTrigger>
          <TabsTrigger value="trades">Trade History</TabsTrigger>
          <TabsTrigger value="monthly">Monthly P&L</TabsTrigger>
        </TabsList>

        <TabsContent value="performance">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span>Portfolio Performance</span>
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                  SIMULATION
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip
                      formatter={(value: number) => [`$${value.toLocaleString()}`, "Portfolio Value"]}
                      labelFormatter={(label) => `Date: ${label}`}
                    />
                    <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} dot={{ fill: "#3b82f6" }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trades">
          <Card>
            <CardHeader>
              <CardTitle>Virtual Trade History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tradeHistory.map((trade, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg border bg-card/50">
                    <div className="flex items-center space-x-4">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{trade.symbol}</span>
                          <Badge
                            variant={trade.type === "buy" ? "default" : "destructive"}
                            className={trade.type === "buy" ? "bg-green-100 text-green-800" : ""}
                          >
                            {trade.type.toUpperCase()}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">
                          {trade.quantity} shares @ ${trade.price}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-medium ${trade.pnl >= 0 ? "text-green-600" : "text-red-600"}`}>
                        {trade.pnl >= 0 ? "+" : ""}${trade.pnl.toFixed(2)}
                      </p>
                      <p className="text-sm text-muted-foreground">{trade.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monthly">
          <Card>
            <CardHeader>
              <CardTitle>Monthly P&L Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyPnL}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="realized" fill="#10b981" name="Realized P&L" />
                    <Bar dataKey="unrealized" fill="#3b82f6" name="Unrealized P&L" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
