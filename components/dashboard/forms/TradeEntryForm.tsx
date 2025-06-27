"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { tradeEntrySchema, TradeEntry } from "@/lib/schemas/trade";
import { useState } from "react";
import {
  Input,
  Textarea,
  Button,
  Label,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui";

export default function TradeEntryForm() {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const form = useForm<TradeEntry>({
    resolver: zodResolver(tradeEntrySchema),
    defaultValues: {
      ticker: "",
      date: "",
      direction: "long",
      entryPrice: 0,
      exitPrice: 0,
      notes: "",
      tags: [],
    },
  });

  const onSubmit = async (data: TradeEntry) => {
    try {
      const res = await fetch("/api/trades", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error(`Failed to submit trade: ${res.statusText}`);
      }

      const saved = await res.json();
      console.log("✅ Trade saved:", saved);

      setSuccessMessage("Trade saved successfully!");
      setErrorMessage("");
      form.reset();
    } catch (error) {
      console.error("❌ Error submitting trade:", error);
      let errorMessage = "Failed to save trade.";
      if (error instanceof Error) {
        errorMessage += ` ${error.message}`;
      } else if (typeof error === "string") {
        errorMessage += ` ${error}`;
      }
      setErrorMessage(errorMessage);
      setSuccessMessage("");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 sm:p-6">
      <form 
        onSubmit={form.handleSubmit(onSubmit)} 
        className="space-y-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 sm:p-6 border border-gray-200 dark:border-gray-700"
      >
        {/* Status Messages */}
        {successMessage && (
          <div className="p-3 rounded-md bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400">
            {successMessage}
          </div>
        )}
        {errorMessage && (
          <div className="p-3 rounded-md bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400">
            {errorMessage}
          </div>
        )}

        {/* Form Grid Layout - 2 columns on larger screens */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Ticker */}
          <div className="space-y-2 md:col-span-1">
            <Label htmlFor="ticker">Ticker Symbol</Label>
            <Input
              id="ticker"
              {...form.register("ticker")}
              placeholder="AAPL"
              className="w-full"
            />
          </div>

          {/* Date */}
          <div className="space-y-2 md:col-span-1">
            <Label htmlFor="date">Trade Date</Label>
            <Input
              id="date"
              type="date"
              {...form.register("date")}
              className="w-full"
            />
          </div>

          {/* Direction */}
          <div className="space-y-2 md:col-span-1">
            <Label htmlFor="direction">Direction</Label>
            <Select
              defaultValue={form.getValues("direction")}
              onValueChange={(val: "long" | "short") => form.setValue("direction", val)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select direction" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="long">Long</SelectItem>
                <SelectItem value="short">Short</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Entry Price */}
          <div className="space-y-2 md:col-span-1">
            <Label htmlFor="entryPrice">Entry Price ($)</Label>
            <Input
              id="entryPrice"
              type="number"
              step="0.01"
              {...form.register("entryPrice", { valueAsNumber: true })}
              className="w-full"
            />
          </div>

          {/* Exit Price */}
          <div className="space-y-2 md:col-span-1">
            <Label htmlFor="exitPrice">Exit Price ($)</Label>
            <Input
              id="exitPrice"
              type="number"
              step="0.01"
              {...form.register("exitPrice", { valueAsNumber: true })}
              className="w-full"
            />
          </div>
        </div>

        {/* Full-width fields */}
        <div className="space-y-4">
          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Trade Notes</Label>
            <Textarea
              id="notes"
              {...form.register("notes")}
              placeholder="Enter your trade analysis..."
              rows={4}
              className="w-full"
            />
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <Label htmlFor="tags">Tags</Label>
            <Input
              id="tags"
              {...form.register("tags")}
              placeholder="breakout, earnings, gap-fill"
              className="w-full"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Separate multiple tags with commas
            </p>
          </div>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full mt-4 py-3 text-base font-medium"
          size="lg"
        >
          Save Trade
        </Button>
      </form>
    </div>
  );
}