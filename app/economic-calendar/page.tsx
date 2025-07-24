"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Calendar, Filter, Bell } from "lucide-react";
import { mockEconomicEvents, filterEvents } from "@/lib/mock-economic-data";
import type { EconomicEvent, CalendarFilter, CalendarView } from "@/lib/types/economic-calendar";
import CalendarFilters from "@/components/economic-calendar/CalendarFilters";

import EventDetailModal from "@/components/economic-calendar/EventDetailModal";
import EconomicCalendarView from "@/components/economic-calendar/EconomicCalendarView";
import UpcomingEventsWidget from "@/components/economic-calendar/UpcomingEventsWidget";


export default function EconomicCalendarPage() {
  const [currentView, setCurrentView] = useState<CalendarView>('monthly');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState<EconomicEvent | null>(null);
  const [filteredEvents, setFilteredEvents] = useState<EconomicEvent[]>(mockEconomicEvents);
  const [filters, setFilters] = useState<CalendarFilter>({
    dateRange: {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0)
    },
    countries: [],
    importance: [],
    currencies: [],
    eventTypes: []
  });

  useEffect(() => {
    applyFilters();
  }, [
    filters.dateRange.start,
    filters.dateRange.end,
    filters.countries,
    filters.importance,
    filters.currencies,
    filters.eventTypes,
    currentDate,
  ]);

  const applyFilters = () => {
    const filtered = filterEvents(mockEconomicEvents, filters);
    setFilteredEvents(filtered);
  };

  const handleEventClick = (event: EconomicEvent) => {
    setSelectedEvent(event);
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
  };

  const handleFilterChange = (newFilters: CalendarFilter) => {
    setFilters(newFilters);
  };

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case 'High':
        return 'text-red-600 bg-red-100';
      case 'Medium':
        return 'text-orange-600 bg-orange-100';
      case 'Low':
        return 'text-blue-600 bg-blue-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="container mx-auto px-4 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Economic Calendar
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Track economic events and their market impact
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Bell className="w-4 h-4 mr-2" />
            Alerts
          </Button>
          <Button variant="outline" size="sm">
            <Calendar className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filters
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CalendarFilters
                filters={filters}
                onFilterChange={handleFilterChange}
              />
            </CardContent>
          </Card>

          {/* Upcoming Events Widget */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
            </CardHeader>
            <CardContent>
              <UpcomingEventsWidget onEventClick={handleEventClick} />
            </CardContent>
          </Card>
        </div>

        {/* Main Calendar View */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <CardTitle>Calendar View</CardTitle>
                <div className="flex space-x-1 p-1 bg-muted rounded-lg">
                  <button
                    onClick={() => setCurrentView('monthly')}
                    className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                      currentView === 'monthly'
                        ? 'bg-background text-foreground shadow-sm border border-border'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/80'
                    }`}
                  >
                    Monthly
                  </button>
                  <button
                    onClick={() => setCurrentView('weekly')}
                    className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                      currentView === 'weekly'
                        ? 'bg-background text-foreground shadow-sm border border-border'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/80'
                    }`}
                  >
                    Weekly
                  </button>
                  <button
                    onClick={() => setCurrentView('daily')}
                    className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                      currentView === 'daily'
                        ? 'bg-background text-foreground shadow-sm border border-border'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/80'
                    }`}
                  >
                    Daily
                  </button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <EconomicCalendarView
                view={currentView}
                events={filteredEvents}
                currentDate={currentDate}
                onEventClick={handleEventClick}
                onDateChange={setCurrentDate}
              />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Event Detail Modal */}
      {selectedEvent && (
        <EventDetailModal
          event={selectedEvent}
          isOpen={!!selectedEvent}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
} 