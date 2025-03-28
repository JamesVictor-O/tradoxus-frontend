import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
// const ALPHA_VANTAGE_API_KEY = process.env.ALPHA_VANTAGE_API_KEY;
const ALPHA_VANTAGE_API_KEY="FP0R3B2MMI2AYUZH"

console.log(ALPHA_VANTAGE_API_KEY)

if (!ALPHA_VANTAGE_API_KEY) {
  throw new Error("Alpha Vantage API key is missing. Set ALPHA_VANTAGE_API_KEY in .env");
}

export async function fetchStockQuote(symbol: string) {
  try {
    console.log(`Fetching quote for ${symbol}...`); // Optional debug log

    interface GlobalQuoteResponse {
      "Global Quote"?: {
        "01. symbol"?: string;
        "05. price"?: string;
        "09. change"?: string;
        "10. change percent"?: string;
      };
      "Error Message"?: string;
    }
    
    const response = await axios.get<GlobalQuoteResponse>("https://www.alphavantage.co/query", {
      params: {
        function: "GLOBAL_QUOTE",
        symbol: symbol,
        apikey: ALPHA_VANTAGE_API_KEY,
      },
    });
    console.log("API Full Response:", JSON.stringify(response.data, null, 2));
    // Debug: Log full response (optional)
    console.log("API Response:", response.data);

    // Check for API errors
    if (response.data["Error Message"]) {
      throw new Error(response.data["Error Message"]);
    }

    // Validate response structure
    if (!response.data["Global Quote"]) {
      throw new Error("Unexpected API response format (missing 'Global Quote')");
    }

    const quote = response.data["Global Quote"];

    // Validate required fields
    if (!quote["01. symbol"] || !quote["05. price"]) {
      throw new Error("Incomplete stock quote data");
    }

    return {
      symbol: quote["01. symbol"],
      price: parseFloat(quote["05. price"]),
      change: parseFloat(quote["09. change"] ?? "0"),
      changePercent: quote["10. change percent"],
    };
  } catch (error) {
    console.error("Stock quote fetch error:", error);
    throw new Error(
      `Failed to fetch stock quote for ${symbol}: ${error instanceof Error ? error.message : String(error)}`
    );
  }
}