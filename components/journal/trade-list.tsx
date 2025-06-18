"use client"
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Search, Edit, Trash2, Eye, Upload, EyeOff, Plus, X } from 'lucide-react';
import { newTrade, Trade } from '@/lib/types/journal';
import { formatCurrency, formatDate, formatDateTime } from '@/lib/utils';

interface TradeListProps {
    trades: Trade[];
    strategies: string[];
    mistakes: string[];
    searchQuery: string;
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
    filterStrategy: string;
    setFilterStrategy: React.Dispatch<React.SetStateAction<string>>;
    showHidden: boolean;
    setShowHidden: React.Dispatch<React.SetStateAction<boolean>>;
    isAddTradeOpen: boolean;
    setIsAddTradeOpen: React.Dispatch<React.SetStateAction<boolean>>;
    newTrade: newTrade;
    setNewTrade: React.Dispatch<React.SetStateAction<newTrade>>;
    handleAddTrade: () => void;
    isEditTradeOpen: boolean;
    setIsEditTradeOpen: React.Dispatch<React.SetStateAction<boolean>>;
    editTrade: Trade | null;
    setEditTrade: React.Dispatch<React.SetStateAction<Trade | null>>;
    filteredTrades: Trade[]
    sortBy: string
    setSortBy: React.Dispatch<React.SetStateAction<string>>
    sortOrder: string
    setSortOrder: React.Dispatch<React.SetStateAction<"desc" | "asc">>
    recentlyEdited: string[];
    setRecentlyEdited: React.Dispatch<React.SetStateAction<string[]>>;
    selectedTrade: Trade | null;
    setSelectedTrade: React.Dispatch<React.SetStateAction<Trade | null>>;
    handleHideTrade: (id: string) => void;
    handleEditTrade: () => void;
    handleDeleteTrade: (id: string) => void;
}


// Trade List Component
export const TradeListComponent = ({
    editTrade, filterStrategy, handleAddTrade, isAddTradeOpen, isEditTradeOpen, mistakes, newTrade, searchQuery, setFilterStrategy, setIsAddTradeOpen, setIsEditTradeOpen, setNewTrade, setSearchQuery, setShowHidden, showHidden, strategies, filteredTrades, sortBy, setSortBy, setSortOrder,
    sortOrder, recentlyEdited, setEditTrade, selectedTrade, handleHideTrade, setSelectedTrade, handleEditTrade, handleDeleteTrade }: TradeListProps) => (
    <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search symbols..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-8 w-full sm:w-64"
                    />
                </div>
                <Select value={filterStrategy} onValueChange={setFilterStrategy}>
                    <SelectTrigger className="w-full sm:w-48">
                        <SelectValue placeholder="Filter by strategy" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Strategies</SelectItem>
                        {strategies.map(strategy => (
                            <SelectItem key={strategy} value={strategy}>{strategy}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Button
                    variant={showHidden ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setShowHidden(!showHidden)}
                    className="w-full sm:w-auto"
                >
                    {showHidden ? <Eye className="h-4 w-4 mr-2" /> : <EyeOff className="h-4 w-4 mr-2" />}
                    {showHidden ? 'Hide Hidden Trades' : 'Show Hidden Trades'}
                </Button>
            </div>
            <AlertDialog open={isAddTradeOpen} onOpenChange={setIsAddTradeOpen}>
                <AlertDialogTrigger asChild>
                    <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Trade
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Add New Trade</AlertDialogTitle>
                        <AlertDialogDescription>
                            Enter the details of your trade below. All fields are required.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="symbol" className="text-sm font-medium">Symbol *</Label>
                                <Input
                                    id="symbol"
                                    value={newTrade.symbol}
                                    onChange={(e) => setNewTrade({ ...newTrade, symbol: e.target.value })}
                                    placeholder="AAPL"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="side" className="text-sm font-medium">Side *</Label>
                                <Select value={newTrade.side} onValueChange={(value: 'Long' | 'Short') => setNewTrade({ ...newTrade, side: value })}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Long">Long</SelectItem>
                                        <SelectItem value="Short">Short</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="entryPrice" className="text-sm font-medium">Entry Price *</Label>
                                <Input
                                    id="entryPrice"
                                    type="number"
                                    step="0.01"
                                    value={newTrade.entryPrice}
                                    onChange={(e) => setNewTrade({ ...newTrade, entryPrice: e.target.value })}
                                    placeholder="150.00"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="exitPrice" className="text-sm font-medium">Exit Price *</Label>
                                <Input
                                    id="exitPrice"
                                    type="number"
                                    step="0.01"
                                    value={newTrade.exitPrice}
                                    onChange={(e) => setNewTrade({ ...newTrade, exitPrice: e.target.value })}
                                    placeholder="155.50"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="quantity" className="text-sm font-medium">Quantity *</Label>
                                <Input
                                    id="quantity"
                                    type="number"
                                    value={newTrade.quantity}
                                    onChange={(e) => setNewTrade({ ...newTrade, quantity: e.target.value })}
                                    placeholder="100"
                                    required
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="entryDate" className="text-sm font-medium">Entry Date & Time *</Label>
                                <Input
                                    id="entryDate"
                                    type="datetime-local"
                                    value={newTrade.entryDate}
                                    onChange={(e) => setNewTrade({ ...newTrade, entryDate: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="exitDate" className="text-sm font-medium">Exit Date & Time *</Label>
                                <Input
                                    id="exitDate"
                                    type="datetime-local"
                                    value={newTrade.exitDate}
                                    onChange={(e) => setNewTrade({ ...newTrade, exitDate: e.target.value })}
                                    required
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="commission" className="text-sm font-medium">Commission/Fees *</Label>
                            <Input
                                id="commission"
                                type="number"
                                step="0.01"
                                value={newTrade.commission}
                                onChange={(e) => setNewTrade({ ...newTrade, commission: e.target.value })}
                                placeholder="2.50"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-sm font-medium">Strategy Tags</Label>
                            <div className="flex flex-wrap gap-2">
                                {strategies.map(strategy => (
                                    <Badge
                                        key={strategy}
                                        variant={newTrade.strategy.includes(strategy) ? "default" : "outline"}
                                        className="cursor-pointer transition-colors hover:bg-gray-200"
                                        onClick={() => {
                                            if (newTrade.strategy.includes(strategy)) {
                                                setNewTrade({ ...newTrade, strategy: newTrade.strategy.filter(s => s !== strategy) });
                                            } else {
                                                setNewTrade({ ...newTrade, strategy: [...newTrade.strategy, strategy] });
                                            }
                                        }}
                                    >
                                        {strategy}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="preTradeNotes" className="text-sm font-medium">Pre-trade Notes</Label>
                            <Textarea
                                id="preTradeNotes"
                                value={newTrade.preTradeNotes}
                                onChange={(e) => setNewTrade({ ...newTrade, preTradeNotes: e.target.value })}
                                placeholder="What was your reasoning for this trade?"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="postTradeNotes" className="text-sm font-medium">Post-trade Reflection</Label>
                            <Textarea
                                id="postTradeNotes"
                                value={newTrade.postTradeNotes}
                                onChange={(e) => setNewTrade({ ...newTrade, postTradeNotes: e.target.value })}
                                placeholder="How did the trade go? What did you learn?"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-sm font-medium">Mistakes Made</Label>
                            <div className="flex flex-wrap gap-2">
                                {mistakes.map(mistake => (
                                    <Badge
                                        key={mistake}
                                        variant={newTrade.mistakes.includes(mistake) ? "destructive" : "outline"}
                                        className="cursor-pointer transition-colors hover:bg-gray-200"
                                        onClick={() => {
                                            if (newTrade.mistakes.includes(mistake)) {
                                                setNewTrade({ ...newTrade, mistakes: newTrade.mistakes.filter(m => m !== mistake) });
                                            } else {
                                                setNewTrade({ ...newTrade, mistakes: [...newTrade.mistakes, mistake] });
                                            }
                                        }}
                                    >
                                        {mistake}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label className="text-sm font-medium">Screenshot Upload</Label>
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                                <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                                <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                                <p className="text-xs text-gray-400">PNG, JPG up to 10MB</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={() => setIsAddTradeOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleAddTrade}>Add Trade</Button>
                    </div>
                </AlertDialogContent>
            </AlertDialog>
        </div>

        <Card>
            <CardHeader>
                <CardTitle>Trade History</CardTitle>
                <CardDescription>
                    {filteredTrades.length} trade{filteredTrades.length !== 1 ? 's' : ''} found
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div className="flex gap-2">
                        <Button
                            variant={sortBy === 'date' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => {
                                if (sortBy === 'date') {
                                    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                                } else {
                                    setSortBy('date');
                                    setSortOrder('desc');
                                }
                            }}
                        >
                            Date {sortBy === 'date' && (sortOrder === 'asc' ? '↑' : '↓')}
                        </Button>
                        <Button
                            variant={sortBy === 'pnl' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => {
                                if (sortBy === 'pnl') {
                                    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                                } else {
                                    setSortBy('pnl');
                                    setSortOrder('desc');
                                }
                            }}
                        >
                            P&L {sortBy === 'pnl' && (sortOrder === 'asc' ? '↑' : '↓')}
                        </Button>
                        <Button
                            variant={sortBy === 'symbol' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => {
                                if (sortBy === 'symbol') {
                                    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                                } else {
                                    setSortBy('symbol');
                                    setSortOrder('asc');
                                }
                            }}
                        >
                            Symbol {sortBy === 'symbol' && (sortOrder === 'asc' ? '↑' : '↓')}
                        </Button>
                    </div>
                    <div className="space-y-2">
                        {filteredTrades.map(trade => (
                            <div
                                key={trade.id}
                                className={`flex items-center justify-between p-4 border rounded-lg transition-all ${recentlyEdited.includes(trade.id) ? 'bg-green-50 border-green-200' : 'hover:bg-gray-50'
                                    }`}
                            >
                                <div className="flex items-center gap-4">
                                    <div className="text-left">
                                        <div className="font-medium">{trade.symbol}</div>
                                        <div className="text-sm text-gray-600">{formatDate(trade.entryDate)}</div>
                                    </div>
                                    <Badge variant={trade.side === 'Long' ? 'default' : 'secondary'}>
                                        {trade.side}
                                    </Badge>
                                    <div className="text-sm">
                                        <div>{formatCurrency(trade.entryPrice)} → {formatCurrency(trade.exitPrice)}</div>
                                        <div className="text-gray-600">{trade.quantity} shares</div>
                                    </div>
                                    <div className={`font-medium ${trade.pnl >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                        {formatCurrency(trade.pnl)}
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                aria-label="View trade details"
                                                onClick={() => setSelectedTrade(trade)}
                                            >
                                                <Eye className="h-4 w-4" />
                                            </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>{trade.symbol} Trade Details</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    {trade.side} position from {formatDateTime(trade.entryDate)} to {formatDateTime(trade.exitDate)}
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <div className="space-y-4">
                                                <div className="grid grid-cols-2 gap-4">
                                                    <Card>
                                                        <CardHeader className="pb-2">
                                                            <CardTitle className="text-sm">Entry</CardTitle>
                                                        </CardHeader>
                                                        <CardContent>
                                                            <div className="space-y-1">
                                                                <div className="text-lg font-semibold">{formatCurrency(trade.entryPrice)}</div>
                                                                <div className="text-sm text-gray-600">{formatDateTime(trade.entryDate)}</div>
                                                            </div>
                                                        </CardContent>
                                                    </Card>
                                                    <Card>
                                                        <CardHeader className="pb-2">
                                                            <CardTitle className="text-sm">Exit</CardTitle>
                                                        </CardHeader>
                                                        <CardContent>
                                                            <div className="space-y-1">
                                                                <div className="text-lg font-semibold">{formatCurrency(trade.exitPrice)}</div>
                                                                <div className="text-sm text-gray-600">{formatDateTime(trade.exitDate)}</div>
                                                            </div>
                                                        </CardContent>
                                                    </Card>
                                                </div>
                                                <div className="grid grid-cols-3 gap-4">
                                                    <div>
                                                        <Label className="text-sm font-medium">Quantity</Label>
                                                        <div className="text-lg">{trade.quantity}</div>
                                                    </div>
                                                    <div>
                                                        <Label className="text-sm font-medium">Duration</Label>
                                                        <div className="text-lg">{trade.duration}h</div>
                                                    </div>
                                                    <div>
                                                        <Label className="text-sm font-medium">P&L</Label>
                                                        <div className={`text-lg font-semibold ${trade.pnl >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                                            {formatCurrency(trade.pnl)}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="space-y-2">
                                                    <Label className="text-sm font-medium">Pre-trade Notes</Label>
                                                    <div className="p-3 bg-gray-50 rounded-lg text-sm">
                                                        {trade.preTradeNotes || 'No notes provided'}
                                                    </div>
                                                </div>
                                                <div className="space-y-2">
                                                    <Label className="text-sm font-medium">Post-trade Reflection</Label>
                                                    <div className="p-3 bg-gray-50 rounded-lg text-sm">
                                                        {trade.postTradeNotes || 'No reflection provided'}
                                                    </div>
                                                </div>
                                                {trade.screenshots.length > 0 && (
                                                    <div className="space-y-2">
                                                        <Label className="text-sm font-medium">Screenshots</Label>
                                                        <div className="grid grid-cols-2 gap-2">
                                                            {trade.screenshots.map((screenshot, index) => (
                                                                <div key={index} className="border rounded-lg p-4 text-center bg-gray-50">
                                                                    <div className="text-sm text-gray-600">{screenshot}</div>
                                                                    <div className="text-xs text-gray-400 mt-1">Mock screenshot placeholder</div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                            <AlertDialogCancel className='border border-orange-300'> Close</AlertDialogCancel>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                    <AlertDialog open={isEditTradeOpen && editTrade?.id === trade.id} onOpenChange={(open) => {
                                        if (!open) setEditTrade(null);
                                        setIsEditTradeOpen(open);
                                    }}>
                                        <AlertDialogTrigger asChild>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                aria-label="Edit trade"
                                                onClick={() => {
                                                    setEditTrade(trade);
                                                    setIsEditTradeOpen(true);
                                                }}
                                            >
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Edit Trade: {trade.symbol}</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    Update the details of your trade below. All fields are required.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            {editTrade && (
                                                <div className="grid gap-4 py-4">
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div className="space-y-2">
                                                            <Label htmlFor="edit-symbol" className="text-sm font-medium">Symbol *</Label>
                                                            <Input
                                                                id="edit-symbol"
                                                                value={editTrade.symbol}
                                                                onChange={(e) => setEditTrade({ ...editTrade, symbol: e.target.value })}
                                                                placeholder="AAPL"
                                                                required
                                                            />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <Label htmlFor="edit-side" className="text-sm font-medium">Side *</Label>
                                                            <Select value={editTrade.side} onValueChange={(value: 'Long' | 'Short') => setEditTrade({ ...editTrade, side: value })}>
                                                                <SelectTrigger>
                                                                    <SelectValue />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    <SelectItem value="Long">Long</SelectItem>
                                                                    <SelectItem value="Short">Short</SelectItem>
                                                                </SelectContent>
                                                            </Select>
                                                        </div>
                                                    </div>
                                                    <div className="grid grid-cols-3 gap-4">
                                                        <div className="space-y-2">
                                                            <Label htmlFor="edit-entryPrice" className="text-sm font-medium">Entry Price *</Label>
                                                            <Input
                                                                id="edit-entryPrice"
                                                                type="number"
                                                                step="0.01"
                                                                value={editTrade.entryPrice}
                                                                onChange={(e) => setEditTrade({ ...editTrade, entryPrice: parseFloat(e.target.value) || 0 })}
                                                                placeholder="150.00"
                                                                required
                                                            />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <Label htmlFor="edit-exitPrice" className="text-sm font-medium">Exit Price *</Label>
                                                            <Input
                                                                id="edit-exitPrice"
                                                                type="number"
                                                                step="0.01"
                                                                value={editTrade.exitPrice}
                                                                onChange={(e) => setEditTrade({ ...editTrade, exitPrice: parseFloat(e.target.value) || 0 })}
                                                                placeholder="155.50"
                                                                required
                                                            />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <Label htmlFor="edit-quantity" className="text-sm font-medium">Quantity *</Label>
                                                            <Input
                                                                id="edit-quantity"
                                                                type="number"
                                                                value={editTrade.quantity}
                                                                onChange={(e) => setEditTrade({ ...editTrade, quantity: parseFloat(e.target.value) || 0 })}
                                                                placeholder="100"
                                                                required
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div className="space-y-2">
                                                            <Label htmlFor="edit-entryDate" className="text-sm font-medium">Entry Date & Time *</Label>
                                                            <Input
                                                                id="edit-entryDate"
                                                                type="datetime-local"
                                                                value={editTrade.entryDate}
                                                                onChange={(e) => setEditTrade({ ...editTrade, entryDate: e.target.value })}
                                                                required
                                                            />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <Label htmlFor="edit-exitDate" className="text-sm font-medium">Exit Date & Time *</Label>
                                                            <Input
                                                                id="edit-exitDate"
                                                                type="datetime-local"
                                                                value={editTrade.exitDate}
                                                                onChange={(e) => setEditTrade({ ...editTrade, exitDate: e.target.value })}
                                                                required
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label htmlFor="edit-commission" className="text-sm font-medium">Commission/Fees *</Label>
                                                        <Input
                                                            id="edit-commission"
                                                            type="number"
                                                            step="0.01"
                                                            value={editTrade.commission}
                                                            onChange={(e) => setEditTrade({ ...editTrade, commission: parseFloat(e.target.value) || 0 })}
                                                            placeholder="2.50"
                                                            required
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label className="text-sm font-medium">Strategy Tags</Label>
                                                        <div className="flex flex-wrap gap-2">
                                                            {strategies.map(strategy => (
                                                                <Badge
                                                                    key={strategy}
                                                                    variant={editTrade.strategy.includes(strategy) ? "default" : "outline"}
                                                                    className="cursor-pointer transition-colors hover:bg-gray-200"
                                                                    onClick={() => {
                                                                        if (editTrade.strategy.includes(strategy)) {
                                                                            setEditTrade({ ...editTrade, strategy: editTrade.strategy.filter(s => s !== strategy) });
                                                                        } else {
                                                                            setEditTrade({ ...editTrade, strategy: [...editTrade.strategy, strategy] });
                                                                        }
                                                                    }}
                                                                >
                                                                    {strategy}
                                                                </Badge>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label htmlFor="edit-preTradeNotes" className="text-sm font-medium">Pre-trade Notes</Label>
                                                        <Textarea
                                                            id="edit-preTradeNotes"
                                                            value={editTrade.preTradeNotes}
                                                            onChange={(e) => setEditTrade({ ...editTrade, preTradeNotes: e.target.value })}
                                                            placeholder="What was your reasoning for this trade?"
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label htmlFor="edit-postTradeNotes" className="text-sm font-medium">Post-trade Reflection</Label>
                                                        <Textarea
                                                            id="edit-postTradeNotes"
                                                            value={editTrade.postTradeNotes}
                                                            onChange={(e) => setEditTrade({ ...editTrade, postTradeNotes: e.target.value })}
                                                            placeholder="How did the trade go? What did you learn?"
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label className="text-sm font-medium">Mistakes Made</Label>
                                                        <div className="flex flex-wrap gap-2">
                                                            {mistakes.map(mistake => (
                                                                <Badge
                                                                    key={mistake}
                                                                    variant={editTrade.mistakes.includes(mistake) ? "destructive" : "outline"}
                                                                    className="cursor-pointer transition-colors hover:bg-gray-200"
                                                                    onClick={() => {
                                                                        if (editTrade.mistakes.includes(mistake)) {
                                                                            setEditTrade({ ...editTrade, mistakes: editTrade.mistakes.filter(m => m !== mistake) });
                                                                        } else {
                                                                            setEditTrade({ ...editTrade, mistakes: [...editTrade.mistakes, mistake] });
                                                                        }
                                                                    }}
                                                                >
                                                                    {mistake}
                                                                </Badge>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label className="text-sm font-medium">Screenshot Upload</Label>
                                                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                                                            <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                                                            <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                                                            <p className="text-xs text-gray-400">PNG, JPG up to 10MB</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                            <div className="flex justify-end gap-2">
                                                <Button variant="outline" onClick={() => setIsEditTradeOpen(false)}>
                                                    Cancel
                                                </Button>
                                                <Button onClick={handleEditTrade}>Save Changes</Button>
                                            </div>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                    <AlertDialog>

                                        <AlertDialogTrigger asChild>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                aria-label="Hide trade"
                                            >
                                                <EyeOff className="h-4 w-4" />
                                            </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Hide Trade</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    Are you sure you want to hide this trade? It will be removed from the default view but can be shown again using the "Show Hidden Trades" filter.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                <AlertDialogAction onClick={() => handleHideTrade(trade.id)}>
                                                    Hide
                                                </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                aria-label="Delete trade"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Delete Trade</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    Are you sure you want to delete this trade? This action cannot be undone.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                <AlertDialogAction onClick={() => handleDeleteTrade(trade.id)}>
                                                    Delete
                                                </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    </div>
);