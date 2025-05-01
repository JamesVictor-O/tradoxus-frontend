import { z } from "zod";

export const tradeEntrySchema = z.object({
  ticker: z.string().min(1, "Ticker is required"),
  date: z.string().min(1, "Date is required").regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),
  direction: z.enum(["long", "short"]),
  entryPrice: z.number().positive("Entry must be positive"),
  exitPrice: z.number().positive("Exit must be positive"),
  notes: z.string().optional(),
  tags: z.preprocess(
    (val) => {
      if (typeof val === "string") {
        return val.split(',').map(tag => tag.trim());
      }
      if (Array.isArray(val)) {
        return val;
      }
      return [];
    },
    z.array(z.string()).optional()
  ),
});

export type TradeEntry = z.infer<typeof tradeEntrySchema>;
