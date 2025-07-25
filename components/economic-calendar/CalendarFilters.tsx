"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronDown, ChevronUp } from "lucide-react";
import type { CalendarFilter, Country, Currency, EventType, EventImportance } from "@/lib/types/economic-calendar";

interface CalendarFiltersProps {
  filters: CalendarFilter;
  onFilterChange: (filters: CalendarFilter) => void;
}

const COUNTRIES: { value: Country; label: string }[] = [
  { value: 'US', label: 'United States' },
  { value: 'EU', label: 'European Union' },
  { value: 'UK', label: 'United Kingdom' },
  { value: 'JP', label: 'Japan' },
  { value: 'CA', label: 'Canada' },
  { value: 'AU', label: 'Australia' },
  { value: 'CH', label: 'Switzerland' },
  { value: 'CN', label: 'China' },
  { value: 'DE', label: 'Germany' },
  { value: 'FR', label: 'France' },
  { value: 'IT', label: 'Italy' },
  { value: 'ES', label: 'Spain' }
];

const CURRENCIES: { value: Currency; label: string }[] = [
  { value: 'USD', label: 'US Dollar' },
  { value: 'EUR', label: 'Euro' },
  { value: 'GBP', label: 'British Pound' },
  { value: 'JPY', label: 'Japanese Yen' },
  { value: 'CAD', label: 'Canadian Dollar' },
  { value: 'AUD', label: 'Australian Dollar' },
  { value: 'CHF', label: 'Swiss Franc' },
  { value: 'CNY', label: 'Chinese Yuan' }
];

const EVENT_TYPES: { value: EventType; label: string }[] = [
  { value: 'GDP', label: 'GDP' },
  { value: 'CPI', label: 'CPI' },
  { value: 'Employment', label: 'Employment' },
  { value: 'Interest Rate', label: 'Interest Rate' },
  { value: 'Trade Balance', label: 'Trade Balance' },
  { value: 'Retail Sales', label: 'Retail Sales' },
  { value: 'Manufacturing', label: 'Manufacturing' },
  { value: 'Other', label: 'Other' }
];

const IMPORTANCE_LEVELS: { value: EventImportance; label: string; color: string }[] = [
  { value: 'High', label: 'High Impact', color: 'text-red-600' },
  { value: 'Medium', label: 'Medium Impact', color: 'text-orange-600' },
  { value: 'Low', label: 'Low Impact', color: 'text-blue-600' }
];

export default function CalendarFilters({ filters, onFilterChange }: CalendarFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const updateFilter = <K extends keyof CalendarFilter>(
    key: K,
    value: CalendarFilter[K]
  ) => {
    onFilterChange({
      ...filters,
      [key]: value
    });
  };

  const toggleArrayFilter = <K extends keyof CalendarFilter>(
    key: K,
    value: string
  ) => {
    const currentArray = filters[key] as string[];
    const newArray = currentArray.includes(value)
      ? currentArray.filter(item => item !== value)
      : [...currentArray, value];
    
    updateFilter(key, newArray as CalendarFilter[K]);
  };

  const clearAllFilters = () => {
    onFilterChange({
      dateRange: {
        start: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        end: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)
      },
      countries: [],
      importance: [],
      currencies: [],
      eventTypes: []
    });
  };

  return (
    <div className="space-y-4">
      {/* Date Range */}
      <div className="space-y-2">
        <Label>Date Range</Label>
        <div className="grid grid-cols-2 gap-2">
          <Input
            type="date"
            value={filters.dateRange.start.toISOString().split('T')[0]}
            onChange={(e) => {
              const newStart = new Date(e.target.value);
              updateFilter('dateRange', {
                ...filters.dateRange,
                start: newStart
              });
            }}
          />
          <Input
            type="date"
            value={filters.dateRange.end.toISOString().split('T')[0]}
            onChange={(e) => {
              const newEnd = new Date(e.target.value);
              updateFilter('dateRange', {
                ...filters.dateRange,
                end: newEnd
              });
            }}
          />
        </div>
      </div>

      {/* Importance Filter */}
      <div className="space-y-2">
        <Label>Importance</Label>
        <div className="space-y-2">
          {IMPORTANCE_LEVELS.map((level) => (
            <div key={level.value} className="flex items-center space-x-2">
              <Checkbox
                id={`importance-${level.value}`}
                checked={filters.importance.includes(level.value)}
                onCheckedChange={() => toggleArrayFilter('importance', level.value)}
              />
              <Label
                htmlFor={`importance-${level.value}`}
                className={`text-sm cursor-pointer ${level.color}`}
              >
                {level.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Expandable Advanced Filters */}
      <div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full justify-between"
        >
          Advanced Filters
          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </Button>

        {isExpanded && (
          <div className="mt-4 space-y-4">
            {/* Countries Filter */}
            <div className="space-y-2">
              <Label>Countries</Label>
              <div className="max-h-32 overflow-y-auto space-y-2">
                {COUNTRIES.map((country) => (
                  <div key={country.value} className="flex items-center space-x-2">
                    <Checkbox
                      id={`country-${country.value}`}
                      checked={filters.countries.includes(country.value)}
                      onCheckedChange={() => toggleArrayFilter('countries', country.value)}
                    />
                    <Label htmlFor={`country-${country.value}`} className="text-sm cursor-pointer">
                      {country.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Currencies Filter */}
            <div className="space-y-2">
              <Label>Currencies</Label>
              <div className="max-h-32 overflow-y-auto space-y-2">
                {CURRENCIES.map((currency) => (
                  <div key={currency.value} className="flex items-center space-x-2">
                    <Checkbox
                      id={`currency-${currency.value}`}
                      checked={filters.currencies.includes(currency.value)}
                      onCheckedChange={() => toggleArrayFilter('currencies', currency.value)}
                    />
                    <Label htmlFor={`currency-${currency.value}`} className="text-sm cursor-pointer">
                      {currency.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Event Types Filter */}
            <div className="space-y-2">
              <Label>Event Types</Label>
              <div className="max-h-32 overflow-y-auto space-y-2">
                {EVENT_TYPES.map((eventType) => (
                  <div key={eventType.value} className="flex items-center space-x-2">
                    <Checkbox
                      id={`eventType-${eventType.value}`}
                      checked={filters.eventTypes.includes(eventType.value)}
                      onCheckedChange={() => toggleArrayFilter('eventTypes', eventType.value)}
                    />
                    <Label htmlFor={`eventType-${eventType.value}`} className="text-sm cursor-pointer">
                      {eventType.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Clear Filters */}
      <Button
        variant="outline"
        size="sm"
        onClick={clearAllFilters}
        className="w-full"
      >
        Clear All Filters
      </Button>
    </div>
  );
} 