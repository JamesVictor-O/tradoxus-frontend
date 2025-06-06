"use client"
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TrendingUp, Activity, Calendar } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Trade } from '@/lib/types/journal';
import { mistakes, mockTrades, strategies } from '@/lib/mock-data';
import { TradeListComponent } from '@/components/journal/trade-list';
import { TradeAnalytics } from '@/components/journal/trade-analytics';
import { TradeDashboard } from '@/components/journal/journal-dashboard';



export const TradingJournal: React.FC = () => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [trades, setTrades] = useState<Trade[]>(mockTrades);
    const [selectedTrade, setSelectedTrade] = useState<Trade | null>(null);
    const [isAddTradeOpen, setIsAddTradeOpen] = useState(false);
    const [isEditTradeOpen, setIsEditTradeOpen] = useState(false);
    const [filteredTrades, setFilteredTrades] = useState<Trade[]>(mockTrades);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStrategy, setFilterStrategy] = useState('all');
    const [sortBy, setSortBy] = useState('date');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
    const [showHidden, setShowHidden] = useState(false); 
    const [recentlyEdited, setRecentlyEdited] = useState<string[]>([]);

    const [newTrade, setNewTrade] = useState({
        symbol: '',
        side: 'Long' as 'Long' | 'Short',
        entryPrice: '',
        exitPrice: '',
        quantity: '',
        entryDate: '',
        exitDate: '',
        commission: '',
        strategy: [] as string[],
        preTradeNotes: '',
        postTradeNotes: '',
        mistakes: [] as string[]
    });

    const [editTrade, setEditTrade] = useState<Trade | null>(null);

    useEffect(() => {
        let filtered = trades.filter(trade => {
            const searchLower = searchQuery.toLowerCase();
            const matchesSearch =
                trade.symbol.toLowerCase().includes(searchLower) ||
                trade.side.toLowerCase().includes(searchLower) ||
                trade.strategy.some(s => s.toLowerCase().includes(searchLower));
            const matchesStrategy = filterStrategy === 'all' || trade.strategy.includes(filterStrategy);
            const matchesHidden = showHidden || !trade.isHidden;
            return matchesSearch && matchesStrategy && matchesHidden;
        });

        filtered.sort((a, b) => {
            let aVal: any, bVal: any;
            switch (sortBy) {
                case 'date':
                    aVal = new Date(a.entryDate);
                    bVal = new Date(b.entryDate);
                    break;
                case 'pnl':
                    aVal = a.pnl;
                    bVal = b.pnl;
                    break;
                case 'symbol':
                    aVal = a.symbol;
                    bVal = b.symbol;
                    break;
                default:
                    aVal = a.entryDate;
                    bVal = b.entryDate;
            }

            if (sortOrder === 'asc') {
                return aVal > bVal ? 1 : -1;
            } else {
                return aVal < bVal ? 1 : -1;
            }
        });

        setFilteredTrades(filtered);
    }, [trades, searchQuery, filterStrategy, sortBy, sortOrder, showHidden]);

    const validateTradeForm = (trade: typeof newTrade) => {
        if (!trade.symbol) return "Symbol is required";
        if (!trade.entryPrice || isNaN(parseFloat(trade.entryPrice))) return "Valid entry price is required";
        if (!trade.exitPrice || isNaN(parseFloat(trade.exitPrice))) return "Valid exit price is required";
        if (!trade.quantity || isNaN(parseFloat(trade.quantity))) return "Valid quantity is required";
        if (!trade.entryDate) return "Entry date is required";
        if (!trade.exitDate) return "Exit date is required";
        if (!trade.commission || isNaN(parseFloat(trade.commission))) return "Valid commission is required";
        return null;
    };

    const handleAddTrade = () => {
        const error = validateTradeForm(newTrade);
        if (error) {
            toast({ variant: "destructive", title: "Error", description: error });
            return;
        }

        const pnl = (parseFloat(newTrade.exitPrice) - parseFloat(newTrade.entryPrice)) * parseFloat(newTrade.quantity) * (newTrade.side === 'Long' ? 1 : -1) - parseFloat(newTrade.commission);
        const entryTime = new Date(newTrade.entryDate);
        const exitTime = new Date(newTrade.exitDate);
        const duration = Math.round((exitTime.getTime() - entryTime.getTime()) / (1000 * 60 * 60));

        const trade: Trade = {
            id: Date.now().toString(),
            symbol: newTrade.symbol.toUpperCase(),
            side: newTrade.side,
            entryPrice: parseFloat(newTrade.entryPrice),
            exitPrice: parseFloat(newTrade.exitPrice),
            quantity: parseFloat(newTrade.quantity),
            entryDate: newTrade.entryDate,
            exitDate: newTrade.exitDate,
            commission: parseFloat(newTrade.commission),
            strategy: newTrade.strategy,
            preTradeNotes: newTrade.preTradeNotes,
            postTradeNotes: newTrade.postTradeNotes,
            mistakes: newTrade.mistakes,
            screenshots: [],
            pnl,
            duration,
            isHidden: false
        };

        setTrades([...trades, trade]);
        setNewTrade({
            symbol: '',
            side: 'Long',
            entryPrice: '',
            exitPrice: '',
            quantity: '',
            entryDate: '',
            exitDate: '',
            commission: '',
            strategy: [],
            preTradeNotes: '',
            postTradeNotes: '',
            mistakes: []
        });
        setIsAddTradeOpen(false);
        toast({ title: "Success", description: "Trade added successfully" });
    };

    const handleEditTrade = () => {
        if (!editTrade) return;
        const error = validateTradeForm({
            symbol: editTrade.symbol,
            side: editTrade.side,
            entryPrice: editTrade.entryPrice.toString(),
            exitPrice: editTrade.exitPrice.toString(),
            quantity: editTrade.quantity.toString(),
            entryDate: editTrade.entryDate,
            exitDate: editTrade.exitDate,
            commission: editTrade.commission.toString(),
            strategy: editTrade.strategy,
            preTradeNotes: editTrade.preTradeNotes,
            postTradeNotes: editTrade.postTradeNotes,
            mistakes: editTrade.mistakes
        });

        if (error) {
            toast({ variant: "destructive", title: "Error", description: error });
            return;
        }

        const pnl = (editTrade.exitPrice - editTrade.entryPrice) * editTrade.quantity * (editTrade.side === 'Long' ? 1 : -1) - editTrade.commission;
        const entryTime = new Date(editTrade.entryDate);
        const exitTime = new Date(editTrade.exitDate);
        const duration = Math.round((exitTime.getTime() - entryTime.getTime()) / (1000 * 60 * 60));

        const updatedTrade: Trade = {
            ...editTrade,
            pnl,
            duration
        };

        setTrades(trades.map(t => t.id === editTrade.id ? updatedTrade : t));
        setRecentlyEdited([...recentlyEdited, editTrade.id]);
        setTimeout(() => setRecentlyEdited(re => re.filter(id => id !== editTrade.id)), 3000); // Highlight for 3s
        setIsEditTradeOpen(false);
        setEditTrade(null);
        toast({ title: "Success", description: "Trade updated successfully" });
    };

    const handleHideTrade = (id: string) => {
        setTrades(trades.map(trade => trade.id === id ? { ...trade, isHidden: true } : trade));
        toast({ title: "Success", description: "Trade hidden successfully" });
    };

    const handleDeleteTrade = (id: string) => {
        setTrades(trades.filter(trade => trade.id !== id));
        toast({ title: "Success", description: "Trade deleted successfully" });
    };


    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto p-6">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Trading Journal</h1>
                    <p className="text-gray-600 mt-2">Track, analyze, and improve your trading performance</p>
                    <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <p className="text-sm text-blue-800">
                            <strong>Demo Mode:</strong> This is a frontend mockup using sample data. Backend integration is not implemented.
                        </p>
                    </div>
                </div>

                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-3 mb-6">
                        <TabsTrigger value="dashboard" className="flex items-center gap-2">
                            <Activity className="h-4 w-4" />
                            Dashboard
                        </TabsTrigger>
                        <TabsTrigger value="trades" className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            Trades
                        </TabsTrigger>
                        <TabsTrigger value="analytics" className="flex items-center gap-2">
                            <TrendingUp className="h-4 w-4" />
                            Analytics
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="dashboard">
                        <TradeDashboard />
                    </TabsContent>

                    <TabsContent value="trades">
                        <TradeListComponent
                            filteredTrades={filteredTrades} handleAddTrade={handleAddTrade} handleDeleteTrade={handleDeleteTrade} handleEditTrade={handleEditTrade}
                            handleHideTrade={handleHideTrade} isAddTradeOpen={isAddTradeOpen} isEditTradeOpen={isEditTradeOpen} mistakes={mistakes} newTrade={newTrade}
                            recentlyEdited={recentlyEdited} searchQuery={searchQuery} selectedTrade={selectedTrade} setEditTrade={setEditTrade} setFilterStrategy={setFilterStrategy}
                            setIsAddTradeOpen={setIsAddTradeOpen} setIsEditTradeOpen={setIsEditTradeOpen} setNewTrade={setNewTrade} setRecentlyEdited={setRecentlyEdited}
                            setSearchQuery={setSearchQuery} setSelectedTrade={setSelectedTrade} setSortBy={setSortBy} setSortOrder={setSortOrder} setShowHidden={setShowHidden}
                            showHidden={showHidden} sortBy={sortBy} sortOrder={sortOrder} strategies={strategies} trades={trades} editTrade={editTrade} filterStrategy={filterStrategy}
                        />
                    </TabsContent>

                    <TabsContent value="analytics">
                        <TradeAnalytics trades={trades} />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
};