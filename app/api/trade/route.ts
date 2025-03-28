import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { fetchStockQuote } from '@/lib/marketDataService';

export async function POST(req: Request) {
    try {
        const { userId, symbol, quantity, type } = await req.json();
        const quote = await fetchStockQuote(symbol);
        const totalCost = quote.price * quantity;

        const result = await prisma.$transaction(async (tx) => {
            const portfolio = await tx.portfolio.findUnique({ where: { userId } });
            if (!portfolio) throw new Error('Portfolio not found');

            if (type === 'BUY' && portfolio.balance < totalCost) {
                throw new Error('Insufficient funds');
            }

            const updatedPortfolio = await tx.portfolio.update({
                where: { userId },
                data: { balance: type === 'BUY' ? { decrement: totalCost } : { increment: totalCost } }
            });

            const existingPosition = await tx.position.findFirst({
                where: { portfolioId: updatedPortfolio.id, symbol }
            });

            if (type === 'BUY') {
                await tx.position.upsert({
                    where: { id: existingPosition?.id || '' },
                    update: {
                        quantity: existingPosition ? existingPosition.quantity + quantity : quantity,
                        avgCost: existingPosition
                            ? ((existingPosition.avgCost * existingPosition.quantity) + (quote.price * quantity))
                                / (existingPosition.quantity + quantity)
                            : quote.price
                    },
                    create: { portfolioId: updatedPortfolio.id, symbol, quantity, avgCost: quote.price }
                });
            } else if (type === 'SELL' && existingPosition) {
                if (existingPosition.quantity > quantity) {
                    await tx.position.update({
                        where: { id: existingPosition.id },
                        data: { quantity: existingPosition.quantity - quantity }
                    });
                } else {
                    await tx.position.delete({ where: { id: existingPosition.id } });
                }
            }

            const trade = await tx.trade.create({
                data: { portfolioId: updatedPortfolio.id, symbol, type, quantity, price: quote.price }
            });

            return { portfolio: updatedPortfolio, trade, quote };
        });

        return NextResponse.json(result);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
