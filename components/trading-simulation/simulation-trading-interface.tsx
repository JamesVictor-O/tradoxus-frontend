"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { TrendingUp, TrendingDown, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react"

interface SimulationTradingInterfaceProps {
  isSimulation: boolean
}

interface Order {
  id: string
  symbol: string
  type: "buy" | "sell"
  orderType: "market" | "limit"
  quantity: number
  price?: number
  status: "pending" | "executed" | "cancelled"
  timestamp: Date
  executedPrice?: number
}

export function SimulationTradingInterface({ isSimulation }: SimulationTradingInterfaceProps) {
  const [selectedSymbol, setSelectedSymbol] = useState("")
  const [orderType, setOrderType] = useState<"market" | "limit">("market")
  const [quantity, setQuantity] = useState("")
  const [limitPrice, setLimitPrice] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const [orders, setOrders] = useState<Order[]>([
    {
      id: "1",
      symbol: "AAPL",
      type: "buy",
      orderType: "market",
      quantity: 10,
      status: "executed",
      timestamp: new Date(Date.now() - 3600000),
      executedPrice: 155.25,
    },
    {
      id: "2",
      symbol: "GOOGL",
      type: "sell",
      orderType: "limit",
      quantity: 5,
      price: 2800.0,
      status: "pending",
      timestamp: new Date(Date.now() - 1800000),
    },
    {
      id: "3",
      symbol: "TSLA",
      type: "buy",
      orderType: "market",
      quantity: 15,
      status: "executed",
      timestamp: new Date(Date.now() - 7200000),
      executedPrice: 235.8,
    },
  ])

  const symbols = [
    { value: "AAPL", label: "Apple Inc. (AAPL)", price: 155.25 },
    { value: "GOOGL", label: "Alphabet Inc. (GOOGL)", price: 2750.0 },
    { value: "TSLA", label: "Tesla Inc. (TSLA)", price: 235.8 },
    { value: "MSFT", label: "Microsoft Corp. (MSFT)", price: 378.85 },
    { value: "AMZN", label: "Amazon.com Inc. (AMZN)", price: 127.74 },
  ]

  const selectedSymbolData = symbols.find((s) => s.value === selectedSymbol)

  const handlePlaceOrder = async (type: "buy" | "sell") => {
    if (!selectedSymbol || !quantity) return

    setIsLoading(true)

    // Simulate order placement
    setTimeout(() => {
      const newOrder: Order = {
        id: Date.now().toString(),
        symbol: selectedSymbol,
        type,
        orderType,
        quantity: Number.parseInt(quantity),
        price: orderType === "limit" ? Number.parseFloat(limitPrice) : undefined,
        status: orderType === "market" ? "executed" : "pending",
        timestamp: new Date(),
        executedPrice: orderType === "market" ? selectedSymbolData?.price : undefined,
      }

      setOrders((prev) => [newOrder, ...prev])
      setQuantity("")
      setLimitPrice("")
      setIsLoading(false)
    }, 1000)
  }

  const getStatusIcon = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "executed":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "cancelled":
        return <XCircle className="h-4 w-4 text-red-500" />
    }
  }

  const getStatusBadge = (status: Order["status"]) => {
    const variants = {
      pending: "secondary",
      executed: "default",
      cancelled: "destructive",
    } as const

    return (
      <Badge
        variant={variants[status]}
        className={
          status === "executed"
            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
            : status === "pending"
              ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
              : ""
        }
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }

  if (!isSimulation) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-muted-foreground">
            <AlertCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Switch to Simulation Mode to practice trading</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Simulation Mode Alert */}
      <Alert className="border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950">
        <AlertCircle className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-800 dark:text-blue-200">
          You are in <strong>SIMULATION MODE</strong>. All trades are virtual and use fake money for practice.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="trade" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="trade">Place Order</TabsTrigger>
          <TabsTrigger value="orders">Order History</TabsTrigger>
        </TabsList>

        <TabsContent value="trade" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span>Virtual Trading Interface</span>
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                  SIMULATION
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Asset Selection */}
              <div className="space-y-2">
                <Label htmlFor="symbol">Select Asset</Label>
                <Select value={selectedSymbol} onValueChange={setSelectedSymbol}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose an asset to trade" />
                  </SelectTrigger>
                  <SelectContent>
                    {symbols.map((symbol) => (
                      <SelectItem key={symbol.value} value={symbol.value}>
                        <div className="flex items-center justify-between w-full">
                          <span>{symbol.label}</span>
                          <span className="ml-2 text-muted-foreground">${symbol.price}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {selectedSymbolData && (
                  <p className="text-sm text-muted-foreground">
                    Current Price: <span className="font-medium">${selectedSymbolData.price}</span>
                  </p>
                )}
              </div>

              {/* Order Type */}
              <div className="space-y-2">
                <Label>Order Type</Label>
                <Select value={orderType} onValueChange={(value: "market" | "limit") => setOrderType(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="market">Market Order</SelectItem>
                    <SelectItem value="limit">Limit Order</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Quantity */}
              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                  id="quantity"
                  type="number"
                  placeholder="Enter quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>

              {/* Limit Price (if limit order) */}
              {orderType === "limit" && (
                <div className="space-y-2">
                  <Label htmlFor="limitPrice">Limit Price</Label>
                  <Input
                    id="limitPrice"
                    type="number"
                    step="0.01"
                    placeholder="Enter limit price"
                    value={limitPrice}
                    onChange={(e) => setLimitPrice(e.target.value)}
                  />
                </div>
              )}

              {/* Order Buttons */}
              <div className="grid grid-cols-2 gap-4">
                <Button
                  onClick={() => handlePlaceOrder("buy")}
                  disabled={!selectedSymbol || !quantity || isLoading || (orderType === "limit" && !limitPrice)}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <TrendingUp className="h-4 w-4 mr-2" />
                  {isLoading ? "Placing..." : "Buy"}
                </Button>
                <Button
                  onClick={() => handlePlaceOrder("sell")}
                  disabled={!selectedSymbol || !quantity || isLoading || (orderType === "limit" && !limitPrice)}
                  variant="destructive"
                >
                  <TrendingDown className="h-4 w-4 mr-2" />
                  {isLoading ? "Placing..." : "Sell"}
                </Button>
              </div>

              {/* Order Preview */}
              {selectedSymbol && quantity && (
                <div className="p-4 rounded-lg border bg-muted/50">
                  <h4 className="font-medium mb-2">Order Preview</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Asset:</span>
                      <span>{selectedSymbol}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Quantity:</span>
                      <span>{quantity}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Order Type:</span>
                      <span className="capitalize">{orderType}</span>
                    </div>
                    {orderType === "market" && selectedSymbolData && (
                      <div className="flex justify-between">
                        <span>Est. Total:</span>
                        <span>${(selectedSymbolData.price * Number.parseInt(quantity || "0")).toFixed(2)}</span>
                      </div>
                    )}
                    {orderType === "limit" && limitPrice && (
                      <div className="flex justify-between">
                        <span>Limit Price:</span>
                        <span>${limitPrice}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <CardTitle>Virtual Order History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4 rounded-lg border bg-card/50">
                    <div className="flex items-center space-x-4">
                      {getStatusIcon(order.status)}
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{order.symbol}</span>
                          <Badge
                            variant={order.type === "buy" ? "default" : "destructive"}
                            className={order.type === "buy" ? "bg-green-100 text-green-800" : ""}
                          >
                            {order.type.toUpperCase()}
                          </Badge>
                          {getStatusBadge(order.status)}
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">
                          {order.quantity} shares • {order.orderType} order
                          {order.price && ` • $${order.price}`}
                          {order.executedPrice && ` • Executed at $${order.executedPrice}`}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">
                        {order.timestamp.toLocaleDateString()} {order.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
