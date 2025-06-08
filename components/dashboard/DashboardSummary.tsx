'use client';

import { Card, CardContent } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useTheme } from "@/context/ThemeContext";
// Dummy data for placeholder chart
const data = [
  { date: "2025-04-01", pnl: 200 },
  { date: "2025-04-02", pnl: -50 },
  { date: "2025-04-03", pnl: 150 },
  { date: "2025-04-04", pnl: 80 },
];

export default function DashboardSummary() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-800">
          <CardContent className="p-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Total Trades</h3>
            <p className="text-2xl mt-2 text-gray-900 dark:text-white">42</p>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-800">
          <CardContent className="p-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Win Rate</h3>
            <p className="text-2xl mt-2 text-gray-900 dark:text-white">67%</p>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-800">
          <CardContent className="p-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Net PnL</h3>
            <p className="text-2xl mt-2 text-green-600 dark:text-green-400">+$1,250</p>
          </CardContent>
        </Card>
      </div>

      {/* Placeholder Chart */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow border border-gray-200 dark:border-gray-800">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">PnL Over Time</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data}>
            <XAxis dataKey="date" stroke="#888" />
            <YAxis stroke="#888" />
            <Tooltip />
            <Area 
              type="monotone" 
              dataKey="pnl" 
              stroke="#10b981" 
              fill={isDark ? "#064e3b" : "#d1fae5"} 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
