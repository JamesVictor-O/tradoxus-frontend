import { Calendar, Trophy } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function UpcomingChallengeCard() {
	return (
		<Card className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
			<CardHeader className="border-b border-gray-200 dark:border-gray-800">
				<CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
					Upcoming Challenge
				</CardTitle>
			</CardHeader>
			<CardContent className="p-4">
				<div className="flex items-start justify-between">
					<div className="space-y-1">
						<div className="flex items-center gap-2">
							<Trophy className="h-5 w-5 text-amber-500" />
							<h3 className="font-medium text-gray-900 dark:text-white">Weekly Trading Competition</h3>
						</div>
						<div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
							<Calendar className="h-4 w-4" />
							<span>Starts in 2 days</span>
						</div>
					</div>
					<button className="py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md transition-colors">
						Join
					</button>
				</div>
			</CardContent>
		</Card>
	);
}