'use client';

import { Card, CardContent } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

// Dummy data for placeholder chart
const data = [
  { date: "2025-04-01", pnl: 200 },
  { date: "2025-04-02", pnl: -50 },
  { date: "2025-04-03", pnl: 150 },
  { date: "2025-04-04", pnl: 80 },
];

export default function DashboardSummary() {
  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <h3 className="text-lg font-semibold">Total Trades</h3>
            <p className="text-2xl mt-2">42</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h3 className="text-lg font-semibold">Win Rate</h3>
            <p className="text-2xl mt-2">67%</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h3 className="text-lg font-semibold">Net PnL</h3>
            <p className="text-2xl mt-2 text-green-600">+$1,250</p>
          </CardContent>
        </Card>
      </div>

      {/* Placeholder Chart */}
      <div className="bg-white p-4 rounded-xl shadow">
        <h3 className="text-lg font-semibold mb-4">PnL Over Time</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="pnl" stroke="#10b981" fill="#d1fae5" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
