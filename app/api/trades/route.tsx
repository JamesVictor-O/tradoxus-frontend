// app/api/trades/route.ts
import { NextResponse } from "next/server";
import { tradeEntrySchema } from "@/lib/schemas/trade";
import fs from "node:fs/promises";
import path from "node:path";


//const FILE_PATH = path.join(process.cwd(), "data", "trades.json");
const FILE_PATH = path.join(process.cwd(), "data", "trades.json");
// Ensure data directory exists
const ensureDataDir = async () => {
  const dirPath = path.dirname(FILE_PATH);
  await fs.mkdir(dirPath, { recursive: true }).catch(err => {
    console.error("Failed to create data directory:", err);
  });
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = tradeEntrySchema.parse(body);

    const fileData = await fs.readFile(FILE_PATH, "utf-8").catch(() => "[]");
    const trades = JSON.parse(fileData);
    const newTrade = { id: Date.now(), ...parsed };

    trades.push(newTrade);
    await ensureDataDir();
    await fs.writeFile(FILE_PATH, JSON.stringify(trades, null, 2));

    return NextResponse.json(newTrade, { status: 201 });
  } catch (error) {
    console.error("Error saving trade:", error);
    return NextResponse.json({ error: "Invalid trade data" }, { status: 400 });
  }
}
