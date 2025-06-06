import { Card, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { CardContent } from "../ui/card";
import { Activity, DollarSign, Target, TrendingUp } from "lucide-react";
import { mockDashboardMetrics } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";



export const TradeDashboard = () => (
    <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total P&L</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className={`text-2xl font-bold ${mockDashboardMetrics.totalPnL >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {formatCurrency(mockDashboardMetrics.totalPnL)}
                    </div>
                    <p className="text-xs text-muted-foreground">
                        {mockDashboardMetrics.totalPnL >= 0 ? '+' : ''}{((mockDashboardMetrics.totalPnL / (mockDashboardMetrics.equityCurve[0]?.value || 10000)) * 100).toFixed(2)}% from start
                    </p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Win Rate</CardTitle>
                    <Target className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{mockDashboardMetrics.winRate}%</div>
                    <p className="text-xs text-muted-foreground">
                        {Math.round(mockDashboardMetrics.winRate * mockDashboardMetrics.totalTrades / 100)} wins of {mockDashboardMetrics.totalTrades} trades
                    </p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Profit Factor</CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{mockDashboardMetrics.profitFactor}</div>
                    <p className="text-xs text-muted-foreground">
                        Gross profit / Gross loss
                    </p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Trades</CardTitle>
                    <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{mockDashboardMetrics.totalTrades}</div>
                    <p className="text-xs text-muted-foreground">
                        Avg: {mockDashboardMetrics.totalTrades > 0 ? formatCurrency(mockDashboardMetrics.totalPnL / mockDashboardMetrics.totalTrades) : formatCurrency(0)} per trade
                    </p>
                </CardContent>
            </Card>
        </div>

        <Card>
            <CardHeader>
                <CardTitle>Equity Curve</CardTitle>
                <CardDescription>Portfolio value over time</CardDescription>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={mockDashboardMetrics.equityCurve}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip formatter={(value) => [formatCurrency(Number(value)), 'Portfolio Value']} />
                        <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} />
                    </LineChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    </div>
);