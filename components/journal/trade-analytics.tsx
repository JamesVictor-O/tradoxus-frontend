"use client"
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { mistakes, mockDashboardMetrics, mockTrades, strategies } from '@/lib/mock-data';
import { formatCurrency } from '@/lib/utils';

interface analyticsProps {
    trades: typeof mockTrades;
}

export const TradeAnalytics = ({ trades }: analyticsProps) => {
    const strategyPerformance = strategies.map(strategy => {
        const strategyTrades = trades.filter(trade => trade.strategy.includes(strategy));
        const totalPnL = strategyTrades.reduce((sum, trade) => sum + trade.pnl, 0);
        const winRate = strategyTrades.length > 0 ?
            (strategyTrades.filter(trade => trade.pnl > 0).length / strategyTrades.length) * 100 : 0;

        return {
            strategy,
            pnl: totalPnL,
            trades: strategyTrades.length,
            winRate: Math.round(winRate)
        };
    }).filter(item => item.trades > 0);

    const mistakeAnalysis = mistakes.map(mistake => {
        const mistakeTrades = trades.filter(trade => trade.mistakes.includes(mistake));
        return {
            mistake,
            count: mistakeTrades.length,
            avgLoss: mistakeTrades.length > 0 ?
                mistakeTrades.reduce((sum, trade) => sum + trade.pnl, 0) / mistakeTrades.length : 0
        };
    }).filter(item => item.count > 0);

    const monthlyPnL = trades.reduce((acc: any[], trade) => {
        const month = new Date(trade.entryDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
        const existing = acc.find(item => item.month === month);
        if (existing) {
            existing.pnl += trade.pnl;
            existing.trades += 1;
        } else {
            acc.push({ month, pnl: trade.pnl, trades: 1 });
        }
        return acc;
    }, []);

    const COLORS = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#06b6d4', '#84cc16', '#f97316'];

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Performance by Strategy</CardTitle>
                        <CardDescription>P&L breakdown by trading strategy</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={strategyPerformance}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="strategy" angle={-45} textAnchor="end" height={100} />
                                <YAxis />
                                <Tooltip formatter={(value) => [formatCurrency(Number(value)), 'P&L']} />
                                <Bar dataKey="pnl" fill="#3b82f6" />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Win Rate by Strategy</CardTitle>
                        <CardDescription>Success rate for each strategy</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={strategyPerformance}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ strategy, winRate }) => `${strategy}: ${winRate}%`}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="winRate"
                                >
                                    {strategyPerformance.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Monthly Performance</CardTitle>
                        <CardDescription>P&L trends over time</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={monthlyPnL}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip formatter={(value) => [formatCurrency(Number(value)), 'P&L']} />
                                <Bar dataKey="pnl" fill="#10b981">
                                    {monthlyPnL.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.pnl >= 0 ? '#10b981' : '#ef4444'} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Mistake Analysis</CardTitle>
                        <CardDescription>Most common trading mistakes</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {mistakeAnalysis.map((item, index) => (
                                <div key={item.mistake} className="flex items-center justify-between p-3 border rounded-lg">
                                    <div>
                                        <div className="font-medium">{item.mistake}</div>
                                        <div className="text-sm text-gray-600">{item.count} occurrence{item.count !== 1 ? 's' : ''}</div>
                                    </div>
                                    <div className="text-right">
                                        <div className={`font-medium ${item.avgLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                            {formatCurrency(item.avgLoss)}
                                        </div>
                                        <div className="text-sm text-gray-600">avg impact</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Performance Summary</CardTitle>
                    <CardDescription>Detailed statistics breakdown</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <h4 className="font-medium">Winning Trades</h4>
                            <div className="space-y-1">
                                <div className="flex justify-between">
                                    <span className="text-sm text-gray-600">Count:</span>
                                    <span>{trades.filter(t => t.pnl > 0).length}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm text-gray-600">Avg:</span>
                                    <span className="text-green-600">{formatCurrency(mockDashboardMetrics.avgWinningTrade)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm text-gray-600">Total:</span>
                                    <span className="text-green-600">{formatCurrency(trades.filter(t => t.pnl > 0).reduce((sum, t) => sum + t.pnl, 0))}</span>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <h4 className="font-medium">Losing Trades</h4>
                            <div className="space-y-1">
                                <div className="flex justify-between">
                                    <span className="text-sm text-gray-600">Count:</span>
                                    <span>{trades.filter(t => t.pnl < 0).length}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm text-gray-600">Avg:</span>
                                    <span className="text-red-600">{formatCurrency(mockDashboardMetrics.avgLosingTrade)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm text-gray-600">Total:</span>
                                    <span className="text-red-600">{formatCurrency(trades.filter(t => t.pnl < 0).reduce((sum, t) => sum + t.pnl, 0))}</span>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <h4 className="font-medium">Risk Metrics</h4>
                            <div className="space-y-1">
                                <div className="flex justify-between">
                                    <span className="text-sm text-gray-600">Profit Factor:</span>
                                    <span>{mockDashboardMetrics.profitFactor}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm text-gray-600">Win Rate:</span>
                                    <span>{mockDashboardMetrics.winRate}%</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm text-gray-600">Avg Trade:</span>
                                    <span>{formatCurrency(mockDashboardMetrics.totalPnL / mockDashboardMetrics.totalTrades)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};