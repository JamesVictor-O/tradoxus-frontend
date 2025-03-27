import { prisma } from './db';
import { fetchStockQuote } from './marketDataService';

export async function executeTrade(
  userId: string, 
  symbol: string, 
  quantity: number, 
  type: 'BUY' | 'SELL'
) {
  // Fetch current stock price
  const quote = await fetchStockQuote(symbol);
  const totalCost = quote.price * quantity;

  // Begin transaction
interface Portfolio {
    id: string;
    userId: string;
    balance: number;
}

interface Position {
    id: string;
    portfolioId: string;
    symbol: string;
    quantity: number;
    avgCost: number;
}

interface Trade {
    id: string;
    portfolioId: string;
    symbol: string;
    type: 'BUY' | 'SELL';
    quantity: number;
    price: number;
}

interface Quote {
    price: number;
}

const result = await prisma.$transaction(async (tx: prisma.TransactionClient) => {
    const portfolio: Portfolio | null = await tx.portfolio.findUnique({
        where: { userId }
    });

    if (!portfolio) {
        throw new Error('Portfolio not found');
    }

    if (type === 'BUY' && portfolio.balance < totalCost) {
        throw new Error('Insufficient funds');
    }

    const updatedPortfolio: Portfolio = await tx.portfolio.update({
        where: { userId },
        data: {
            balance: type === 'BUY' 
                ? { decrement: totalCost }
                : { increment: totalCost }
        }
    });

    const existingPosition: Position | null = await tx.position.findFirst({
        where: { 
            portfolioId: updatedPortfolio.id, 
            symbol 
        }
    });

    if (type === 'BUY') {
        await tx.position.upsert({
            where: { 
                id: existingPosition?.id || '' 
            },
            update: {
                quantity: existingPosition 
                    ? existingPosition.quantity + quantity 
                    : quantity,
                avgCost: existingPosition
                    ? ((existingPosition.avgCost * existingPosition.quantity) + (quote.price * quantity)) 
                        / (existingPosition.quantity + quantity)
                    : quote.price
            },
            create: {
                portfolioId: updatedPortfolio.id,
                symbol,
                quantity,
                avgCost: quote.price
            }
        });
    } else if (type === 'SELL' && existingPosition) {
        if (existingPosition.quantity > quantity) {
            await tx.position.update({
                where: { id: existingPosition.id },
                data: { 
                    quantity: existingPosition.quantity - quantity 
                }
            });
        } else {
            await tx.position.delete({
                where: { id: existingPosition.id }
            });
        }
    }

    const trade: Trade = await tx.trade.create({
        data: {
            portfolioId: updatedPortfolio.id,
            symbol,
            type,
            quantity,
            price: quote.price
        }
    });

    return { portfolio: updatedPortfolio, trade, quote };
});

  return result;
}

