import { getServerSession } from 'next-auth';
import { PrismaClient } from '@prisma/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default async function DashboardPage() {
  const session = await getServerSession();
  const prisma = new PrismaClient();

  if (!session?.user) {
    return <div>Please log in</div>;
  }

  const portfolio = await prisma.portfolio.findUnique({
    where: { userId: session.user.id },
    include: { 
      positions: true,
      trades: { 
        orderBy: { timestamp: 'desc' },
        take: 5 
      }
    }
  });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl mb-4">Trading Dashboard</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Portfolio Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <p>Cash Balance: ${portfolio?.balance.toFixed(2)}</p>
            <h2>Current Positions</h2>
            {portfolio?.positions.map(position => (
              <div key={position.id}>
                {position.symbol}: {position.quantity} shares
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}