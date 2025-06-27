"use client"
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, Legend } from 'recharts';
import { mistakes, strategies } from '@/lib/mock-data';
import { formatCurrency } from '@/lib/utils';
import { Trade } from '@/lib/types/journal';

interface analyticsProps {
    trades: Trade[];
}

interface MonthlyPnL {
    month: string;
    pnl: number;
    trades: number;
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

    const monthlyPnL = trades.reduce((acc: MonthlyPnL[], trade) => {
        const month = new Date(trade.entryDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
        const existing = acc.find(item => item.month === month);
        if (existing) {
            existing.pnl += trade.pnl;
            existing.trades += 1;
        } else {
            acc.push({ month, pnl: trade.pnl, trades: 1 });
        }
        return acc;
    }, []).sort((a, b) => new Date(a.month).getTime() - new Date(b.month).getTime());

    const winningTrades = trades.filter(t => t.pnl > 0);
    const losingTrades = trades.filter(t => t.pnl < 0);
    const avgWinningTrade = winningTrades.length > 0
        ? winningTrades.reduce((sum, t) => sum + t.pnl, 0) / winningTrades.length
        : 0;
    const avgLosingTrade = losingTrades.length > 0
        ? losingTrades.reduce((sum, t) => sum + t.pnl, 0) / losingTrades.length
        : 0;
    const totalPnL = trades.reduce((sum, t) => sum + t.pnl, 0);
    const winRate = trades.length > 0 ? (winningTrades.length / trades.length) * 100 : 0;

    const totalWins = winningTrades.reduce((sum, t) => sum + t.pnl, 0);
    const totalLosses = Math.abs(losingTrades.reduce((sum, t) => sum + t.pnl, 0));
    const profitFactor = totalLosses > 0 ? totalWins / totalLosses : totalWins > 0 ? Infinity : 0;

    const COLORS = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#06b6d4', '#84cc16', '#f97316'];

    return (
        <div className="space-y-4 md:space-y-6 px-2 sm:px-4">
            {/* Strategy Performance Charts */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-6">
                <Card className="h-full">
                    <CardHeader>
                        <CardTitle>Performance by Strategy</CardTitle>
                        <CardDescription>P&L breakdown by trading strategy</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[300px] sm:h-[400px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart 
                                data={strategyPerformance}
                                margin={{ top: 20, right: 30, left: 20, bottom: 80 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis 
                                    dataKey="strategy" 
                                    angle={-45} 
                                    textAnchor="end" 
                                    height={70}
                                    tick={{ fontSize: 12 }}
                                />
                                <YAxis 
                                    tickFormatter={(value) => formatCurrency(value)}
                                    tick={{ fontSize: 12 }}
                                />
                                <Tooltip 
                                    formatter={(value) => [formatCurrency(Number(value)), 'P&L']}
                                    contentStyle={{ borderRadius: '0.5rem', fontSize: 14 }}
                                />
                                <Legend />
                                <Bar 
                                    dataKey="pnl" 
                                    name="Profit/Loss"
                                    fill="#3b82f6"
                                    radius={[4, 4, 0, 0]}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card className="h-full">
                    <CardHeader>
                        <CardTitle>Win Rate by Strategy</CardTitle>
                        <CardDescription>Success rate for each strategy</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[300px] sm:h-[400px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={strategyPerformance}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                    outerRadius={80}
                                    innerRadius={40}
                                    paddingAngle={5}
                                    dataKey="winRate"
                                    nameKey="strategy"
                                >
                                    {strategyPerformance.map((entry, index) => (
                                        <Cell key={`cell-${entry.strategy}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip 
                                    formatter={(value, name, props) => [`${value}%`, props.payload.strategy]}
                                    contentStyle={{ borderRadius: '0.5rem', fontSize: 14 }}
                                />
                                <Legend 
                                    layout="horizontal"
                                    verticalAlign="bottom"
                                    height={40}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>

            {/* Monthly Performance & Mistakes */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-6">
                <Card className="h-full">
                    <CardHeader>
                        <CardTitle>Monthly Performance</CardTitle>
                        <CardDescription>P&L trends over time</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[300px] sm:h-[400px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart 
                                data={monthlyPnL}
                                margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis 
                                    dataKey="month" 
                                    tick={{ fontSize: 12 }}
                                />
                                <YAxis 
                                    tickFormatter={(value) => formatCurrency(value)}
                                    tick={{ fontSize: 12 }}
                                />
                                <Tooltip 
                                    formatter={(value) => [formatCurrency(Number(value)), 'P&L']}
                                    contentStyle={{ borderRadius: '0.5rem', fontSize: 14 }}
                                />
                                <Legend />
                                <Bar 
                                    dataKey="pnl" 
                                    name="Monthly P&L"
                                >
                                    {monthlyPnL.map((entry, index) => (
                                        <Cell 
                                            key={`cell-${entry.month}`} 
                                            fill={entry.pnl >= 0 ? '#10b981' : '#ef4444'} 
                                        />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Mistake Analysis</CardTitle>
                        <CardDescription>Most common trading mistakes and their impact</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {mistakeAnalysis.map((item) => (
                                <div 
                                    key={item.mistake} 
                                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    <div className="flex-1 min-w-0">
                                        <div className="font-medium text-sm sm:text-base truncate">{item.mistake}</div>
                                        <div className="text-xs sm:text-sm text-gray-600 mt-1">
                                            {item.count} occurrence{item.count !== 1 ? 's' : ''}
                                        </div>
                                    </div>
                                    <div className="text-right mt-2 sm:mt-0 sm:ml-4">
                                        <div className={`font-medium text-sm sm:text-base ${item.avgLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                            {formatCurrency(item.avgLoss)}
                                        </div>
                                        <div className="text-xs sm:text-sm text-gray-600">avg impact</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Performance Summary */}
            <Card>
                <CardHeader>
                    <CardTitle>Performance Summary</CardTitle>
                    <CardDescription>Key trading metrics and statistics</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                            <h4 className="font-medium text-lg mb-3">Winning Trades</h4>
                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm sm:text-base text-gray-600">Count:</span>
                                    <span className="font-medium">{winningTrades.length}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm sm:text-base text-gray-600">Average:</span>
                                    <span className="font-medium text-green-600">{formatCurrency(avgWinningTrade)}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm sm:text-base text-gray-600">Total:</span>
                                    <span className="font-medium text-green-600">{formatCurrency(totalWins)}</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                            <h4 className="font-medium text-lg mb-3">Losing Trades</h4>
                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm sm:text-base text-gray-600">Count:</span>
                                    <span className="font-medium">{losingTrades.length}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm sm:text-base text-gray-600">Average:</span>
                                    <span className="font-medium text-red-600">{formatCurrency(avgLosingTrade)}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm sm:text-base text-gray-600">Total:</span>
                                    <span className="font-medium text-red-600">-{formatCurrency(totalLosses)}</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                            <h4 className="font-medium text-lg mb-3">Risk Metrics</h4>
                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm sm:text-base text-gray-600">Profit Factor:</span>
                                    <span className="font-medium">{profitFactor.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm sm:text-base text-gray-600">Win Rate:</span>
                                    <span className="font-medium">{winRate.toFixed(2)}%</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm sm:text-base text-gray-600">Total P&L:</span>
                                    <span className={`font-medium ${totalPnL >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                        {formatCurrency(totalPnL)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};