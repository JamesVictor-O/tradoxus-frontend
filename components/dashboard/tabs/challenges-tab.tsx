import { BarChart3, Coins, Trophy } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChallengeCard } from "@/components/dashboard/challenge-card";


export function ChallengesTab() {
	return (
		<Card className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
			<CardHeader className="border-b border-gray-200 dark:border-gray-800">
				<CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
					Upcoming Challenges
				</CardTitle>
				<p className="text-sm text-gray-600 dark:text-gray-400">Test your skills and earn rewards</p>
			</CardHeader>
			<CardContent className="p-4 space-y-4">
				<ChallengeCard
					title="Weekly Trading Competition"
					description="Compete with other traders for the highest returns"
					icon={Trophy}
					startDate="Starts in 2 days"
					reward="500 XP + Badge"
					status="upcoming"
				/>

				<ChallengeCard
					title="Market Analysis Challenge"
					description="Analyze market conditions and make predictions"
					icon={BarChart3}
					startDate="Starts in 5 days"
					reward="300 XP"
					status="upcoming"
				/>

				<ChallengeCard
					title="Trading Bot Hackathon"
					description="Build an automated trading strategy"
					icon={Coins}
					startDate="Starts in 2 weeks"
					reward="1000 XP + Certificate"
					status="upcoming"
				/>
			</CardContent>
		</Card>
	);
}