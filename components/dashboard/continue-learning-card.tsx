import { ChevronRight, CheckCircle, Coins } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export function ContinueLearningCard() {
	return (
		<Card className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
			<CardHeader className="border-b border-gray-200 dark:border-gray-800">
				<CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
					Continue Learning
				</CardTitle>
				<p className="text-sm text-gray-600 dark:text-gray-400">Pick up where you left off</p>
			</CardHeader>
			<CardContent className="p-4 space-y-4">
				<div className="space-y-2">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-2">
							<CheckCircle className="h-5 w-5 text-green-500" />
							<span className="font-medium text-gray-900 dark:text-white">
								Fundamental Financial Concepts
							</span>
						</div>
						<span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400">
							Completed
						</span>
					</div>
					<div className="h-2 w-full bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
						<div
							className="h-full bg-green-500 rounded-full"
							style={{ width: "100%" }}
						></div>
					</div>
				</div>

				<div className="space-y-2">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-2">
							<Coins className="h-5 w-5 text-blue-500" />
							<span className="font-medium text-gray-900 dark:text-white">Crypto Ecosystem</span>
						</div>
						<span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400">
							In Progress
						</span>
					</div>
					<div className="h-2 w-full bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
						<div
							className="h-full bg-blue-500 rounded-full"
							style={{ width: "65%" }}
						></div>
					</div>
				</div>
			</CardContent>
			<CardFooter className="p-4 border-t border-gray-200 dark:border-gray-800">
				<button className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors flex items-center justify-center">
					Continue Learning
					<ChevronRight className="ml-2 h-4 w-4" />
				</button>
			</CardFooter>
		</Card>
	);
}