"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import type { EconomicEvent, CalendarView } from "@/lib/types/economic-calendar";

interface EconomicCalendarViewProps {
  view: CalendarView;
  events: EconomicEvent[];
  currentDate: Date;
  onEventClick: (event: EconomicEvent) => void;
  onDateChange: (date: Date) => void;
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

const getDaysInMonth = (date: Date) => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
};

const getFirstDayOfMonth = (date: Date) => {
  return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
};

const getEventsForDate = (events: EconomicEvent[], date: Date) => {
  return events.filter(event => {
    const eventDate = new Date(event.date);
    return eventDate.toDateString() === date.toDateString();
  });
};

const formatTime = (time: string) => {
  return time;
};

export default function EconomicCalendarView({
  view,
  events,
  currentDate,
  onEventClick,
  onDateChange
}: EconomicCalendarViewProps) {
  const navigateDate = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    
    switch (view) {
      case 'monthly':
        newDate.setMonth(newDate.getMonth() + (direction === 'next' ? 1 : -1));
        break;
      case 'weekly':
        newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7));
        break;
      case 'daily':
        newDate.setDate(newDate.getDate() + (direction === 'next' ? 1 : -1));
        break;
    }
    
    onDateChange(newDate);
  };

  const renderMonthlyView = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];
    const today = new Date();
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-24 bg-gray-50" />);
    }
    
    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const dayEvents = getEventsForDate(events, date);
      const isToday = date.toDateString() === today.toDateString();
      
      days.push(
        <div 
          key={day} 
          className={`h-24 border border-gray-200 p-1 relative ${
            isToday ? 'bg-muted/50 border-primary/30' : ''
          }`}
        >
          <div className={`text-sm font-medium mb-1 ${
            isToday ? 'text-primary font-bold' : ''
          }`}>
            {day}
            {isToday && <span className="ml-1 text-xs bg-primary text-primary-foreground px-1 rounded">TODAY</span>}
          </div>
          <div className="space-y-1">
            {dayEvents.slice(0, 2).map((event) => (
              <div
                key={event.id}
                className="text-xs p-1 rounded cursor-pointer hover:bg-blue-50 transition-colors"
                onClick={() => onEventClick(event)}
              >
                <div className="flex items-center gap-1">
                  <span>{COUNTRY_FLAGS[event.country]}</span>
                  <Badge className={`text-xs ${getImportanceColor(event.importance)}`}>
                    {event.importance}
                  </Badge>
                </div>
                <div className="truncate">{event.title}</div>
                <div className="text-gray-500">{formatTime(event.time)}</div>
              </div>
            ))}
            {dayEvents.length > 2 && (
              <div className="text-xs text-gray-500 text-center">
                +{dayEvents.length - 2} more
              </div>
            )}
          </div>
        </div>
      );
    }
    
    return (
      <div className="grid grid-cols-7 gap-1">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="h-8 flex items-center justify-center font-medium text-sm bg-gray-100">
            {day}
          </div>
        ))}
        {days}
      </div>
    );
  };

  const renderWeeklyView = () => {
    const weekStart = new Date(currentDate);
    weekStart.setDate(weekStart.getDate() - weekStart.getDay());
    const today = new Date();
    
    const weekDays = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(weekStart);
      date.setDate(date.getDate() + i);
      const dayEvents = getEventsForDate(events, date);
      const isToday = date.toDateString() === today.toDateString();
      
      weekDays.push(
        <div key={i} className={`flex-1 border border-gray-200 ${
          isToday ? 'bg-muted/50 border-primary/30' : ''
        }`}>
          <div className={`p-2 border-b ${
            isToday ? 'bg-muted border-primary/30' : 'bg-gray-50'
          }`}>
            <div className={`font-medium ${
              isToday ? 'text-primary font-bold' : ''
            }`}>
              {date.toLocaleDateString('en-US', { weekday: 'short' })}
              {isToday && <span className="ml-1 text-xs bg-primary text-primary-foreground px-1 rounded">TODAY</span>}
            </div>
            <div className={`text-sm ${
              isToday ? 'text-primary font-semibold' : 'text-gray-500'
            }`}>
              {date.getDate()}
            </div>
          </div>
          <div className="p-2 space-y-2">
            {dayEvents.map((event) => (
              <div
                key={event.id}
                className="p-2 border rounded cursor-pointer hover:bg-blue-50 transition-colors"
                onClick={() => onEventClick(event)}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span>{COUNTRY_FLAGS[event.country]}</span>
                  <Badge className={getImportanceColor(event.importance)}>
                    {event.importance}
                  </Badge>
                  <span className="text-xs text-gray-500">{formatTime(event.time)}</span>
                </div>
                <div className="text-sm font-medium">{event.title}</div>
                <div className="text-xs text-gray-500">{event.currency} • {event.eventType}</div>
              </div>
            ))}
          </div>
        </div>
      );
    }
    
    return <div className="flex gap-2">{weekDays}</div>;
  };

  const renderDailyView = () => {
    const dayEvents = getEventsForDate(events, currentDate);
    const today = new Date();
    const isToday = currentDate.toDateString() === today.toDateString();
    
    return (
      <div className="space-y-4">
        <div className={`text-lg font-medium p-3 rounded-lg ${
          isToday ? 'bg-muted/50 border border-primary/30 text-primary' : ''
        }`}>
          {currentDate.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
          {isToday && (
            <span className="ml-3 text-sm bg-primary text-primary-foreground px-2 py-1 rounded">
              TODAY
            </span>
          )}
        </div>
        
        {dayEvents.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No events scheduled for this day</p>
          </div>
        ) : (
          <div className="space-y-3">
            {dayEvents.map((event) => (
              <Card
                key={event.id}
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => onEventClick(event)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{COUNTRY_FLAGS[event.country]}</span>
                      <div>
                        <h3 className="font-semibold">{event.title}</h3>
                        <p className="text-sm text-gray-600">{event.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className={getImportanceColor(event.importance)}>
                        {event.importance}
                      </Badge>
                      <div className="text-sm font-medium mt-1">{formatTime(event.time)}</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Currency:</span>
                      <span className="ml-2 font-medium">{event.currency}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Type:</span>
                      <span className="ml-2 font-medium">{event.eventType}</span>
                    </div>
                    {event.forecastValue && (
                      <div>
                        <span className="text-gray-500">Forecast:</span>
                        <span className="ml-2 font-medium">{event.forecastValue}</span>
                      </div>
                    )}
                    {event.previousValue && (
                      <div>
                        <span className="text-gray-500">Previous:</span>
                        <span className="ml-2 font-medium">{event.previousValue}</span>
                      </div>
                    )}
                  </div>
                  
                  {event.affectedAssets.length > 0 && (
                    <div className="mt-3 pt-3 border-t">
                      <div className="text-sm text-gray-500 mb-1">Affected Assets:</div>
                      <div className="flex flex-wrap gap-1">
                        {event.affectedAssets.map((asset, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {asset}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigateDate('prev')}
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Previous
        </Button>
        
        <div className="text-lg font-semibold">
          {view === 'monthly' && currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          {view === 'weekly' && `Week of ${currentDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`}
          {view === 'daily' && currentDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
        </div>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigateDate('next')}
        >
          Next
          <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </div>
      
      {/* Calendar Content */}
      <div className="border rounded-lg p-4">
        {view === 'monthly' && renderMonthlyView()}
        {view === 'weekly' && renderWeeklyView()}
        {view === 'daily' && renderDailyView()}
      </div>
    </div>
  );
} 