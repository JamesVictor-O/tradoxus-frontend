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
      form.reset(); // Clear form
    } catch (error) {
      console.error("❌ Error submitting trade:", error);
      let errorMessage = "Failed to save trade.";
      // Extract more specific error information if available
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
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 p-6 max-w-md">
      {successMessage && (
        <p className="text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 p-3 rounded-md">
          {successMessage}
        </p>
      )}
      {errorMessage && (
        <p className="text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 p-3 rounded-md">
          {errorMessage}
        </p>
      )}     
      
      <div className="space-y-2">
        <Label htmlFor="ticker" className="text-gray-700 dark:text-gray-300">Ticker</Label>
        <Input 
          {...form.register("ticker")} 
          placeholder="e.g. AAPL"
          className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="date" className="text-gray-700 dark:text-gray-300">Date</Label>
        <Input 
          type="date" 
          {...form.register("date")}
          className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="direction" className="text-gray-700 dark:text-gray-300">Direction</Label>
        <Select
          defaultValue={form.getValues("direction")}
          onValueChange={(val: "long" | "short") => form.setValue("direction", val)}
        >
          <SelectTrigger className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100">
            <SelectValue placeholder="Select direction" />
          </SelectTrigger>
          <SelectContent className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700">
            <SelectItem value="long" className="text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700">Long</SelectItem>
            <SelectItem value="short" className="text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700">Short</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="entryPrice" className="text-gray-700 dark:text-gray-300">Entry Price</Label>
        <Input 
          type="number" 
          step="0.01" 
          {...form.register("entryPrice", { valueAsNumber: true })}
          className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="exitPrice" className="text-gray-700 dark:text-gray-300">Exit Price</Label>
        <Input 
          type="number" 
          step="0.01" 
          {...form.register("exitPrice", { valueAsNumber: true })}
          className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes" className="text-gray-700 dark:text-gray-300">Notes</Label>
        <Textarea 
          {...form.register("notes")}
          className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="tags" className="text-gray-700 dark:text-gray-300">Tags (comma-separated)</Label>
        <Input 
          {...form.register("tags")} 
          placeholder="e.g. breakout,earnings"
          className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100"
        />
      </div>

      <Button 
        type="submit"
        className="w-full bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800 text-white"
      >
        Save Trade
      </Button>
    </form>
  );
}
