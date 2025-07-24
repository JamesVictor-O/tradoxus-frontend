"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Flag, TrendingUp } from "lucide-react";
import { getUpcomingEvents } from "@/lib/mock-economic-data";
import type { EconomicEvent } from "@/lib/types/economic-calendar";

interface UpcomingEventsWidgetProps {
  onEventClick: (event: EconomicEvent) => void;
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

export default function UpcomingEventsWidget({ onEventClick }: UpcomingEventsWidgetProps) {
  const [events, setEvents] = useState<EconomicEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEvents = () => {
      const upcomingEvents = getUpcomingEvents(5);
      setEvents(upcomingEvents);
      setLoading(false);
    };

    loadEvents();
    const interval = setInterval(loadEvents, 60000); // Refresh every minute

    return () => clearInterval(interval);
  }, []);

  const formatCountdown = (event: EconomicEvent) => {
    const now = new Date();
    const eventDate = new Date(event.date);
    const timeDiff = eventDate.getTime() - now.getTime();
    
    if (timeDiff <= 0) return 'Now';
    
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (days > 0) {
      return `${days}d ${hours}h`;
    }
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  const formatTime = (time: string) => {
    return time;
  };

  if (loading) {
    return (
      <div className="space-y-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
            <div className="h-3 bg-gray-200 rounded w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="text-center py-4 text-gray-500">
        <Clock className="w-8 h-8 mx-auto mb-2 opacity-50" />
        <p className="text-sm">No upcoming events</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {events.map((event) => (
        <Card
          key={event.id}
          className="cursor-pointer hover:shadow-md transition-shadow border-l-4 border-l-blue-500"
          onClick={() => onEventClick(event)}
        >
          <CardContent className="p-3">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-lg">{COUNTRY_FLAGS[event.country]}</span>
                <Badge className={getImportanceColor(event.importance)}>
                  {event.importance}
                </Badge>
              </div>
              <div className="text-right">
                <div className="text-xs text-gray-500">{formatTime(event.time)}</div>
                <div className="text-xs font-medium text-blue-600">
                  {formatCountdown(event)}
                </div>
              </div>
            </div>
            
            <h4 className="font-medium text-sm mb-1 line-clamp-2">
              {event.title}
            </h4>
            
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>{event.currency}</span>
              <span>{event.eventType}</span>
            </div>
            
            {event.forecastValue && (
              <div className="mt-2 flex items-center gap-1 text-xs">
                <TrendingUp className="w-3 h-3" />
                <span>Forecast: {event.forecastValue}</span>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
      
      <Button
        variant="outline"
        size="sm"
        className="w-full mt-4"
        onClick={() => {
          // Navigate to full calendar view
          window.location.href = '/economic-calendar';
        }}
      >
        View All Events
      </Button>
    </div>
  );
} 