'use client';

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend
} from "recharts";
import { useTheme } from "@/context/ThemeContext";

const pnlData = [
  { date: "Apr 1", pnl: 200 },
  { date: "Apr 2", pnl: -50 },
  { date: "Apr 3", pnl: 150 },
  { date: "Apr 4", pnl: 80 },
  { date: "Apr 5", pnl: 20 },
];

const winLossData = [
  { name: "Wins", value: 14 },
  { name: "Losses", value: 6 },
];

const COLORS = ["#10b981", "#ef4444"];

const monthlyData = [
  { month: "Jan", pnl: 1200 },
  { month: "Feb", pnl: 800 },
  { month: "Mar", pnl: 1500 },
  { month: "Apr", pnl: 400 },
];

export default function Analytics() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className="space-y-10">
      {/* PnL Area Chart */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">PnL Over Time</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={pnlData}>
            <XAxis 
              dataKey="date" 
              stroke={isDark ? "#9ca3af" : "#6b7280"} 
            />
            <YAxis 
              stroke={isDark ? "#9ca3af" : "#6b7280"} 
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: isDark ? "#1f2937" : "#ffffff",
                border: isDark ? "1px solid #374151" : "1px solid #e5e7eb",
                color: isDark ? "#f3f4f6" : "#1f2937"
              }}
            />
            <Area 
              type="monotone" 
              dataKey="pnl" 
              stroke="#10b981" 
              fill={isDark ? "#064e3b" : "#d1fae5"} 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Win/Loss Pie Chart */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Win / Loss Ratio</h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={winLossData}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {winLossData.map((entry) => (
                <Cell key={entry.name} fill={COLORS[entry.name === "Wins" ? 0 : 1]} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{
                backgroundColor: isDark ? "#1f2937" : "#ffffff",
                border: isDark ? "1px solid #374151" : "1px solid #e5e7eb",
                color: isDark ? "#f3f4f6" : "#1f2937"
              }}
            />
            <Legend 
              wrapperStyle={{
                color: isDark ? "#f3f4f6" : "#1f2937"
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Monthly Performance Bar Chart */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Monthly Performance</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthlyData}>
            <XAxis 
              dataKey="month" 
              stroke={isDark ? "#9ca3af" : "#6b7280"} 
            />
            <YAxis 
              stroke={isDark ? "#9ca3af" : "#6b7280"} 
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: isDark ? "#1f2937" : "#ffffff",
                border: isDark ? "1px solid #374151" : "1px solid #e5e7eb",
                color: isDark ? "#f3f4f6" : "#1f2937"
              }}
            />
            <Bar 
              dataKey="pnl" 
              fill={isDark ? "#064e3b" : "#d1fae5"} 
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
