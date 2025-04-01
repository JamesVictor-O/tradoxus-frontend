// app/api/stocks/route.ts
import { NextResponse } from 'next/server'
import { fetchStockData, searchStocks } from '@/lib/stocks'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const symbol = searchParams.get('symbol')
  const query = searchParams.get('query')

  if (symbol) {
    const data = await fetchStockData(symbol)
    return NextResponse.json(data)
  }

  if (query) {
    const results = await searchStocks(query)
    return NextResponse.json(results)
  }

  return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
}