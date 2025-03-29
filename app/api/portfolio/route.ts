// app/api/portfolio/route.ts
import { NextResponse } from 'next/server'
import { getPortfolio, createTransaction } from '@/lib/portfolio'

// Simplified without auth
export async function GET() {
  try {
    // Use a default portfolio ID or create one
    const portfolio = await getPortfolio()
    return NextResponse.json(portfolio)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch portfolio' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const { symbol, type, quantity } = await request.json()

  try {
    const transaction = await createTransaction(symbol, type, quantity)
    return NextResponse.json(transaction)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}