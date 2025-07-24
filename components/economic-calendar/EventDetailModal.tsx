"use client";

import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Clock, TrendingUp, TrendingDown, AlertTriangle, Bell } from "lucide-react";
import type { EconomicEvent, AlertTime, AlertMethod } from "@/lib/types/economic-calendar";

interface EventDetailModalProps {
  event: EconomicEvent;
  isOpen: boolean;
  onClose: () => void;
}

const COUNTRY_FLAGS: Record<string, string> = {
  'US': '🇺🇸',
  'EU': '🇪🇺',
  'UK': '🇬🇧',
  'JP': '🇯🇵',
  'CA': '🇨🇦',
  'AU': '🇦🇺',
  'CH': '🇨🇭',
  'CN': '🇨🇳',
  'DE': '🇩🇪',
  'FR': '🇫🇷',
  'IT': '🇮🇹',
  'ES': '🇪🇸'
};

const getImportanceColor = (importance: string) => {
  switch (importance) {
    case 'High':
      return 'bg-red-100 text-red-800 border-red-200';
    case 'Medium':
      return 'bg-orange-100 text-orange-800 border-orange-200';
    case 'Low':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

export default function EventDetailModal({ event, isOpen, onClose }: EventDetailModalProps) {
  const [countdown, setCountdown] = useState<string>('');
  const [alertTime, setAlertTime] = useState<AlertTime>('15min');
  const [alertMethod, setAlertMethod] = useState<AlertMethod>('push');

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const eventDate = new Date(event.date);
      const timeDiff = eventDate.getTime() - now.getTime();
      
      if (timeDiff <= 0) {
        setCountdown('Event is happening now');
        return;
      }
      
      const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
      
      if (days > 0) {
        setCountdown(`${days}d ${hours}h ${minutes}m`);
      } else if (hours > 0) {
        setCountdown(`${hours}h ${minutes}m ${seconds}s`);
      } else {
        setCountdown(`${minutes}m ${seconds}s`);
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [event.date]);

  const handleSetAlert = () => {
    // TODO: Implement alert creation
    console.log('Setting alert for event:', event.id, 'Time:', alertTime, 'Method:', alertMethod);
  };

  const formatTime = (time: string) => {
    return time;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <span className="text-2xl">{COUNTRY_FLAGS[event.country]}</span>
            <div>
              <div className="text-xl font-semibold">{event.title}</div>
              <div className="text-sm text-gray-500">{event.country} • {event.currency}</div>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Event Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Badge className={getImportanceColor(event.importance)}>
                {event.importance} Impact
              </Badge>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="w-4 h-4" />
                {formatTime(event.time)}
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">Time until event</div>
              <div className="text-lg font-mono font-semibold text-blue-600">
                {countdown}
              </div>
            </div>
          </div>

          {/* Event Values */}
          {(event.previousValue || event.forecastValue || event.actualValue) && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
              {event.previousValue && (
                <div className="text-center">
                  <div className="text-sm text-gray-500 mb-1">Previous</div>
                  <div className="text-lg font-semibold">{event.previousValue}</div>
                </div>
              )}
              {event.forecastValue && (
                <div className="text-center">
                  <div className="text-sm text-gray-500 mb-1">Forecast</div>
                  <div className="text-lg font-semibold text-blue-600">{event.forecastValue}</div>
                </div>
              )}
              {event.actualValue && (
                <div className="text-center">
                  <div className="text-sm text-gray-500 mb-1">Actual</div>
                  <div className="text-lg font-semibold text-green-600">{event.actualValue}</div>
                </div>
              )}
            </div>
          )}

          {/* Description */}
          <div>
            <h3 className="font-semibold mb-2">Description</h3>
            <p className="text-gray-700">{event.description}</p>
          </div>

          {/* Affected Assets */}
          {event.affectedAssets.length > 0 && (
            <div>
              <h3 className="font-semibold mb-2">Affected Assets</h3>
              <div className="flex flex-wrap gap-2">
                {event.affectedAssets.map((asset, index) => (
                  <Badge key={index} variant="outline">
                    {asset}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Historical Impact */}
          {event.historicalImpact && (
            <div>
              <h3 className="font-semibold mb-2">Historical Impact</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="text-center">
                  <div className="text-sm text-gray-500 mb-1">Price Reaction</div>
                  <div className={`text-lg font-semibold ${event.historicalImpact.priceReaction > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {event.historicalImpact.priceReaction > 0 ? '+' : ''}{event.historicalImpact.priceReaction}%
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-500 mb-1">Volatility Impact</div>
                  <div className="text-lg font-semibold text-orange-600">
                    +{event.historicalImpact.volatilityImpact}%
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-500 mb-1">Recovery Time</div>
                  <div className="text-lg font-semibold">
                    {event.historicalImpact.timeToRecovery}h
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tabs for Additional Information */}
          <Tabs defaultValue="alert" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="alert">Set Alert</TabsTrigger>
              <TabsTrigger value="analysis">Impact Analysis</TabsTrigger>
            </TabsList>
            
            <TabsContent value="alert" className="space-y-4">
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-3">Notification Settings</h4>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Alert Time</label>
                    <Select value={alertTime} onValueChange={(value: AlertTime) => setAlertTime(value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5min">5 minutes before</SelectItem>
                        <SelectItem value="15min">15 minutes before</SelectItem>
                        <SelectItem value="30min">30 minutes before</SelectItem>
                        <SelectItem value="1hour">1 hour before</SelectItem>
                        <SelectItem value="1day">1 day before</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">Delivery Method</label>
                    <Select value={alertMethod} onValueChange={(value: AlertMethod) => setAlertMethod(value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="email">Email</SelectItem>
                        <SelectItem value="push">Push Notification</SelectItem>
                        <SelectItem value="sms">SMS</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Button onClick={handleSetAlert} className="w-full">
                    <Bell className="w-4 h-4 mr-2" />
                    Set Alert
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="analysis" className="space-y-4">
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-3">Market Impact Analysis</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded">
                    <span className="text-sm">Expected Market Volatility</span>
                    <Badge variant="outline" className="text-blue-600">
                      {event.historicalImpact?.volatilityImpact || 'N/A'}%
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded">
                    <span className="text-sm">Potential Price Movement</span>
                    <Badge variant="outline" className="text-green-600">
                      ±{event.historicalImpact?.priceReaction || 'N/A'}%
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-orange-50 rounded">
                    <span className="text-sm">Market Recovery Time</span>
                    <Badge variant="outline" className="text-orange-600">
                      {event.historicalImpact?.timeToRecovery || 'N/A'} hours
                    </Badge>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
} 