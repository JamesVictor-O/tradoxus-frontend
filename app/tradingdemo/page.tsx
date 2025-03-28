'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronDown } from 'lucide-react';
import { executeTrade } from '@/lib/tradeService';

export default function TradePage() {
  const [symbol, setSymbol] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [tradeType, setTradeType] = useState<'BUY' | 'SELL'>('BUY');
  const [error, setError] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);


  
  // const handleTrade = async (type: "BUY" | "SELL") => {
  //   try {
  //     // Convert quantity to number explicitly
  //     const numericQuantity = Number(quantity)
      
  //     const response = await fetch("/api/trade", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         userId: "1234",
  //         symbol,
  //         quantity: numericQuantity,
  //         type,
  //       }),
  //     })
  
  //     const data = await response.json()
      
  //     if (!response.ok) {
  //       // Handle API error responses
  //       throw new Error(data.error || "Trade failed")
  //     }
  
  //     setError(`Trade successful: ${data.trade.symbol} at ${data.trade.price}`)
  //     setSymbol('')
  //     setQuantity(0)
      
  //   } catch (error) {
  //     console.error("Trade error:", error)
  //     setError(error instanceof Error ? error.message : "Trade failed")
  //     setSymbol('')
  //     setQuantity(0)
  //   }
  // }

  const handleTrade = async () => {
    setError(null);
    if (!symbol || quantity <= 0) {
      setError('Please enter a valid symbol and quantity');
      return;
    }

    try {
      const result = await executeTrade(
        'user-id-from-session',
        symbol.toUpperCase(),
        quantity,
        tradeType
      );
      console.log('Trade executed:', result);
      // Reset form or show success message
    } catch (error) {
      console.error('Trade failed:', error);
      setError(error instanceof Error ? error.message : 'An unexpected error occurred');
    }
  };


  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Trade Stocks
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label htmlFor="symbol" className="block text-sm font-medium text-gray-700 mb-2">
                Stock Symbol
              </label>
              <Input 
                id="symbol"
                placeholder="Enter stock symbol (e.g., AAPL)" 
                value={symbol}
                onChange={(e) => setSymbol(e.target.value)}
                className="w-full"
              />
            </div>

            <div>
              <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
                Quantity
              </label>
              <Input 
                id="quantity"
                type="number"
                placeholder="Number of shares" 
                value={quantity || ''}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-full"
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Trade Type
              </label>
              <div className="relative">
                <button 
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-full flex justify-between items-center border border-gray-300 rounded-md px-3 py-2 text-left"
                >
                  {tradeType}
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                </button>
                {isDropdownOpen && (
                  <div className="absolute z-10 w-full mt-1 border border-gray-300 rounded-md shadow-lg">
                    <ul className="bg-white">
                      <li 
                        onClick={() => {
                          setTradeType('BUY');
                          setIsDropdownOpen(false);
                        }}
                        className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                      >
                        Buy
                      </li>
                      <li 
                        onClick={() => {
                          setTradeType('SELL');
                          setIsDropdownOpen(false);
                        }}
                        className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                      >
                        Sell
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {error && (
              <div className="text-red-500 text-sm text-center">
                {error}
              </div>
            )}

            <button 
              onClick={handleTrade} 
              disabled={!symbol || quantity <= 0}
              style={{ width: '100%' }}
              className="bg-blue-500 text-white py-2 px-4 rounded disabled:opacity-50"
            >
              Execute Trade
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}