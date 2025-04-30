import { z } from "zod";

export const tradeEntrySchema = z.object({
  ticker: z.string().min(1, "Ticker is required"),
  date: z.string().min(1, "Date is required"),
  direction: z.enum(["long", "short"]),
  entryPrice: z.number().positive("Entry must be positive"),
  exitPrice: z.number().positive("Exit must be positive"),
  notes: z.string().optional(),
  tags: z.string().optional(), // Comma-separated
});

export type TradeEntry = z.infer<typeof tradeEntrySchema>;
