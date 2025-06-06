import DashboardSummary from "@/components/dashboard/DashboardSummary";
import Analytics from "@/components/dashboard/analytics/Analytics";
import TradeForm from "@/components/dashboard/forms/TradeEntryForm";
import { TradingJournal } from "./journal-client";

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-8">
      <TradingJournal />
     
    </div>
  );
}
