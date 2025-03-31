export const dynamic = 'force-dynamic'; // Opt out of static caching
export const runtime = 'nodejs'; // Explicitly use Node.js runtime

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { fetchStockData } from '@/lib/stocks';

export async function POST(req: Request) {
  try {
    console.log('Trade endpoint called'); // Debug log
    
    const { symbol, type, quantity, userId } = await req.json();
    
    // Validate input
    if (!symbol || !type || !quantity || !userId) {
      throw new Error('Missing required fields');
    }

    // DEVELOPMENT TEMPORARY FIX: Auto-create user if doesn't exist
    const user = await prisma.user.upsert({
      where: { id: userId },
      create: {
        id: userId,
        email: `temp+${userId}@example.com`,
        name: "Temporary User",
        password: "temporary_password" 
      },
      update: {}
    });

    // Auto-create portfolio if doesn't exist
    const portfolio = await prisma.portfolio.upsert({
      where: { userId },
      create: {
        name: "Main Portfolio",
        cashBalance: 10000.00,
        userId
      },
      update: {}
    });

    // Get current market price
    const quote = await fetchStockData(symbol);
    const totalCost = quote.price * quantity;

    // Execute transaction
    const result = await prisma.$transaction(async (tx) => {
      // 1. Verify sufficient funds for BUY orders
      if (type === 'BUY' && portfolio.cashBalance < totalCost) {
        throw new Error('Insufficient funds');
      }

      // 2. Update portfolio balance
      const updatedPortfolio = await tx.portfolio.update({
        where: { id: portfolio.id },
        data: {
          cashBalance: type === 'BUY' 
            ? { decrement: totalCost }
            : { increment: totalCost }
        }
      });

      // 3. Update/create position
      if (type === 'BUY') {
        await tx.position.upsert({
          where: { portfolioId_symbol: { portfolioId: portfolio.id, symbol } },
          create: {
            portfolioId: portfolio.id,
            symbol,
            quantity,
            avgPrice: quote.price
          },
          update: {
            quantity: { increment: quantity },
            avgPrice: 
              ((position.avgPrice * position.quantity) + (quote.price * quantity)) / 
              (position.quantity + quantity)
          }
        });
      } else {
        // SELL logic
        const position = await tx.position.findUniqueOrThrow({
          where: { portfolioId_symbol: { portfolioId: portfolio.id, symbol } }
        });

        if (position.quantity < quantity) {
          throw new Error('Insufficient shares to sell');
        }

        if (position.quantity === quantity) {
          await tx.position.delete({
            where: { portfolioId_symbol: { portfolioId: portfolio.id, symbol } }
          });
        } else {
          await tx.position.update({
            where: { portfolioId_symbol: { portfolioId: portfolio.id, symbol } },
            data: { quantity: { decrement: quantity } }
          });
        }
      }

      // 4. Record transaction
      const trade = await tx.transaction.create({
        data: {
          portfolioId: portfolio.id,
          symbol,
          type,
          quantity,
          price: quote.price,
          amount: totalCost
        }
      });

      return { portfolio: updatedPortfolio, trade, quote };
    });

    return NextResponse.json(result, {
      headers: { 'Content-Type': 'application/json' }
    });
    
  } catch (error: any) {
    console.error('Trade error:', error);
    return NextResponse.json(
      { error: error.message },
      { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}

