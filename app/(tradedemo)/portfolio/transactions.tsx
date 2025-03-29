// app/(dashboard)/portfolio/transactions.tsx
'use client'

import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table'
import { usePortfolio } from '@/lib/hooks/use-portfolio'
import { format } from 'date-fns'

export default function TransactionsPage() {
  const { portfolio, isLoading, error } = usePortfolio()

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Transaction History</h1>
      
      {portfolio?.transactions && portfolio.transactions.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Symbol</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {portfolio.transactions.map((tx: any) => (
              <TableRow key={tx.id}>
                <TableCell>{format(new Date(tx.createdAt), 'MMM d, yyyy HH:mm')}</TableCell>
                <TableCell className={tx.type === 'BUY' ? 'text-green-500' : 'text-red-500'}>
                  {tx.type}
                </TableCell>
                <TableCell>{tx.symbol}</TableCell>
                <TableCell>{tx.quantity.toFixed(2)}</TableCell>
                <TableCell>${tx.price.toFixed(2)}</TableCell>
                <TableCell>${tx.amount.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p>No transactions yet.</p>
      )}
    </div>
  )
}