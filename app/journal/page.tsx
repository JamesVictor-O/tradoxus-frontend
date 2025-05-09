import DashboardSummary from "@/components/dashboard/DashboardSummary";
import Analytics from "@/components/dashboard/analytics/Analytics";
import TradeForm from "@/components/dashboard/forms/TradeEntryForm";

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Trading Journal Dashboard</h1>
        {/* Could add a New Trade button to open form modal here */}
      </div>

      {/* Summary Cards */}
      <DashboardSummary />

      {/* Analytics */}
      <Analytics />

      {/* Trade Entry Form */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="text-lg font-semibold mb-4">New Trade Entry</h3>
        <TradeForm />
      </div>
    </div>
  );
}
