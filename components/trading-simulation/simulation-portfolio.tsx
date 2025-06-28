"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, TrendingDown, DollarSign, PieChart, RotateCcw } from "lucide-react"
import { useState } from "react"

interface Holding {
  symbol: string
  name: string
  quantity: number
  avgPrice: number
  currentPrice: number
  totalValue: number
  unrealizedPL: number
  unrealizedPLPercent: number
}

interface SimulationPortfolioProps {
  isSimulation: boolean
}

export function SimulationPortfolio({ isSimulation }: SimulationPortfolioProps) {
  const [virtualBalance] = useState(100000) // Starting virtual balance
  const [cashBalance] = useState(75000)

  const holdings: Holding[] = [
    {
      symbol: "AAPL",
      name: "Apple Inc.",
      quantity: 50,
      avgPrice: 150.0,
      currentPrice: 155.25,
      totalValue: 7762.5,
      unrealizedPL: 262.5,
      unrealizedPLPercent: 3.5,
    },
    {
      symbol: "GOOGL",
      name: "Alphabet Inc.",
      quantity: 10,
      avgPrice: 2800.0,
      currentPrice: 2750.0,
      totalValue: 27500.0,
      unrealizedPL: -500.0,
      unrealizedPLPercent: -1.8,
    },
    {
      symbol: "TSLA",
      name: "Tesla Inc.",
      quantity: 25,
      avgPrice: 220.0,
      currentPrice: 235.8,
      totalValue: 5895.0,
      unrealizedPL: 395.0,
      unrealizedPLPercent: 7.2,
    },
  ]

  const totalPortfolioValue = cashBalance + holdings.reduce((sum, holding) => sum + holding.totalValue, 0)
  const totalUnrealizedPL = holdings.reduce((sum, holding) => sum + holding.unrealizedPL, 0)
  const totalUnrealizedPLPercent = (totalUnrealizedPL / (totalPortfolioValue - totalUnrealizedPL)) * 100

  const handleResetPortfolio = () => {
    // This would trigger a portfolio reset
    console.log("Reset portfolio to initial state")
  }

  if (!isSimulation) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-muted-foreground">
            <PieChart className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Switch to Simulation Mode to view your virtual portfolio</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Portfolio Summary */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-blue-200 bg-blue-50/50 dark:border-blue-800 dark:bg-blue-950/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Virtual Balance</p>
                <p className="text-2xl font-bold">${virtualBalance.toLocaleString()}</p>
              </div>
              <DollarSign className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Cash Balance</p>
                <p className="text-2xl font-bold">${cashBalance.toLocaleString()}</p>
              </div>
              <DollarSign className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Value</p>
                <p className="text-2xl font-bold">${totalPortfolioValue.toLocaleString()}</p>
              </div>
              <PieChart className="h-8 w-8 text-muted-foreground" />
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
                <p className={`text-sm ${totalUnrealizedPL >= 0 ? "text-green-600" : "text-red-600"}`}>
                  ({totalUnrealizedPLPercent.toFixed(2)}%)
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
      </div>

      {/* Holdings */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Virtual Holdings</CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={handleResetPortfolio}
            className="text-blue-600 border-blue-200 hover:bg-blue-50 bg-transparent"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset Portfolio
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {holdings.map((holding) => (
              <div key={holding.symbol} className="flex items-center justify-between p-4 rounded-lg border bg-card/50">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <div>
                      <h4 className="font-semibold">{holding.symbol}</h4>
                      <p className="text-sm text-muted-foreground">{holding.name}</p>
                    </div>
                  </div>
                  <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Quantity</p>
                      <p className="font-medium">{holding.quantity}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Avg Price</p>
                      <p className="font-medium">${holding.avgPrice.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Current Price</p>
                      <p className="font-medium">${holding.currentPrice.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Total Value</p>
                      <p className="font-medium">${holding.totalValue.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <Badge
                    variant={holding.unrealizedPL >= 0 ? "default" : "destructive"}
                    className={holding.unrealizedPL >= 0 ? "bg-green-100 text-green-800" : ""}
                  >
                    {holding.unrealizedPL >= 0 ? "+" : ""}${holding.unrealizedPL.toFixed(2)}
                  </Badge>
                  <p className={`text-sm mt-1 ${holding.unrealizedPL >= 0 ? "text-green-600" : "text-red-600"}`}>
                    ({holding.unrealizedPLPercent >= 0 ? "+" : ""}
                    {holding.unrealizedPLPercent.toFixed(2)}%)
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Portfolio Allocation */}
      <Card>
        <CardHeader>
          <CardTitle>Portfolio Allocation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Cash</span>
              <span className="text-sm">{((cashBalance / totalPortfolioValue) * 100).toFixed(1)}%</span>
            </div>
            <Progress value={(cashBalance / totalPortfolioValue) * 100} className="h-2" />

            {holdings.map((holding) => (
              <div key={holding.symbol}>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{holding.symbol}</span>
                  <span className="text-sm">{((holding.totalValue / totalPortfolioValue) * 100).toFixed(1)}%</span>
                </div>
                <Progress value={(holding.totalValue / totalPortfolioValue) * 100} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
