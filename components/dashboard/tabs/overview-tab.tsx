import { Award, BarChart3, BookOpen, FileText, MessageSquare, Play, Trophy, TrendingUp } from "lucide-react";
import { MetricCard } from "@/components/dashboard/metric-card";
import { ContinueLearningCard } from "@/components/dashboard/continue-learning-card";
import { ActionCard } from "@/components/dashboard/action-card";
import { UpcomingChallengeCard } from "@/components/dashboard/upcoming-challenge-card";

export function OverviewTab() {
	return (
		<div className="space-y-6">
			{/* Progress summary */}
			<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
				<MetricCard
					title="Course Completion"
					value="35%"
					icon={BookOpen}
					description="2/7 modules completed"
					color="bg-blue-900/30 text-blue-400"
				/>
				<MetricCard
					title="Trading Simulations"
					value="75%"
					icon={BarChart3}
					description="12 simulations completed"
					color="bg-green-900/30 text-green-400"
				/>
				<MetricCard
					title="Leaderboard Rank"
					value="#342"
					icon={Award}
					description="of 1,200 traders"
					color="bg-amber-900/30 text-amber-400"
				/>
				<MetricCard
					title="XP Earned"
					value="250"
					icon={Trophy}
					description="Level up at 300 XP"
					color="bg-purple-900/30 text-purple-400"
				/>
			</div>

			{/* Current learning path */}
			<ContinueLearningCard />

			{/* Quick actions */}
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
				<ActionCard
					title="Portfolio Performance"
					description="View real-time portfolio analytics"
					icon={TrendingUp}
					variant="primary"
					href="/portfolio-performance"
				/>
				<ActionCard
					title="Start Trading Simulation"
					description="Practice with virtual funds"
					icon={Play}
					variant="secondary"
					href="/trading-simulation"
				/>
				<ActionCard
					title="Review Past Lessons"
					description="Revisit completed modules"
					icon={FileText}
					variant="secondary"
				/>
				<ActionCard
					title="Join Community Discussion"
					description="Connect with other traders"
					icon={MessageSquare}
					variant="secondary"
				/>
			</div>

			{/* Upcoming challenge */}
			<UpcomingChallengeCard />
		</div>
	);
}
