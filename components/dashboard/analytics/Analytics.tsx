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
  return (
    <div className="space-y-10">
      {/* PnL Area Chart */}
      <div className="bg-white p-4 rounded-xl shadow">
        <h3 className="text-lg font-semibold mb-4">PnL Over Time</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={pnlData}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="pnl" stroke="#10b981" fill="#d1fae5" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Win/Loss Pie Chart */}
      <div className="bg-white p-4 rounded-xl shadow">
        <h3 className="text-lg font-semibold mb-4">Win / Loss Ratio</h3>
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
              label
            >
              {winLossData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[entry.name === "Wins" ? 0 : 1]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Monthly Performance Bar Chart */}
      <div className="bg-white p-4 rounded-xl shadow">
        <h3 className="text-lg font-semibold mb-4">Monthly Performance</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthlyData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="pnl" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
