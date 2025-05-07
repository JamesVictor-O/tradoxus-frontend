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
      {successMessage && <p className="text-green-600">{successMessage}</p>}
      {errorMessage && <p className="text-red-600">{errorMessage}</p>}     
      
      <div>
        <Label htmlFor="ticker">Ticker</Label>
        <Input {...form.register("ticker")} placeholder="e.g. AAPL" />
      </div>

      <div>
        <Label htmlFor="date">Date</Label>
        <Input type="date" {...form.register("date")} />
      </div>

      <div>
        <Label htmlFor="direction">Direction</Label>
        <Select
          defaultValue={form.getValues("direction")}
          onValueChange={(val: "long" | "short") => form.setValue("direction", val)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select direction" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="long">Long</SelectItem>
            <SelectItem value="short">Short</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="entryPrice">Entry Price</Label>
        <Input type="number" step="0.01" {...form.register("entryPrice", { valueAsNumber: true })} />
      </div>

      <div>
        <Label htmlFor="exitPrice">Exit Price</Label>
        <Input type="number" step="0.01" {...form.register("exitPrice", { valueAsNumber: true })} />
      </div>

      <div>
        <Label htmlFor="notes">Notes</Label>
        <Textarea {...form.register("notes")} />
      </div>

      <div>
        <Label htmlFor="tags">Tags (comma-separated)</Label>
        <Input {...form.register("tags")} placeholder="e.g. breakout,earnings" />
      </div>

      <Button type="submit">Save Trade</Button>
    </form>
  );
}
