// components/dashboard/order-form.tsx
'use client'
import { useState } from 'react'
import { usePortfolio } from '@/lib/hooks/use-portfolio'




export function OrderForm() {
  const [symbol, setSymbol] = useState('')
  const [quantity, setQuantity] = useState('')
  const [orderType, setOrderType] = useState('BUY')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { portfolio, mutate } = usePortfolio()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/portfolio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          symbol,
          type: orderType,
          quantity: parseFloat(quantity),
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to place order')
      }

      await mutate()
      alert(`${orderType} order for ${quantity} shares of ${symbol} has been completed.`)
      setSymbol('')
      setQuantity('')
    } catch (error: any) {
      alert(`Order failed: ${error.message}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col gap-1">
        <label htmlFor="symbol" className="text-sm font-medium">
          Symbol
        </label>
        <input
          id="symbol"
          type="text"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value.toUpperCase())}
          required
          className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="quantity" className="text-sm font-medium">
          Quantity
        </label>
        <input
          id="quantity"
          type="number"
          min="0.01"
          step="0.01"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
          className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex gap-4 items-center">
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="orderType"
            value="BUY"
            checked={orderType === 'BUY'}
            onChange={() => setOrderType('BUY')}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500"
          />
          Buy
        </label>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="orderType"
            value="SELL"
            checked={orderType === 'SELL'}
            onChange={() => setOrderType('SELL')}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500"
          />
          Sell
        </label>
      </div>

      <button
        type="submit"
        disabled={isSubmitting || !symbol || !quantity}
        className={`px-4 py-2 rounded-md text-white ${
          isSubmitting || !symbol || !quantity
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {isSubmitting ? 'Processing...' : 'Place Order'}
      </button>

      {portfolio && (
        <div className="text-sm text-gray-500">
          Available cash: ${portfolio.cashBalance.toFixed(2)}
        </div>
      )}
    </form>
  )
}