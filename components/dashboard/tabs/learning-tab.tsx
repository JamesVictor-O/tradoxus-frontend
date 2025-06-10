import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LearningPathItem } from "@/components/dashboard/learning-path-item";

export function LearningTab() {
	return (
		<Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
			<CardHeader className="border-b border-gray-200 dark:border-gray-800">
				<CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
					Your Learning Path
				</CardTitle>
				<p className="text-sm text-gray-600 dark:text-gray-400">
					Track your progress through the curriculum
				</p>
			</CardHeader>
			<CardContent className="p-4 space-y-6">
				<LearningPathItem
					title="Fundamental Financial Concepts"
					description="Learn the basics of financial markets"
					progress={100}
					status="completed"
					modules={[
						{ name: "Introduction to Markets", completed: true },
						{ name: "Understanding Assets", completed: true },
						{ name: "Risk Management", completed: true },
					]}
				/>

				<LearningPathItem
					title="Crypto Ecosystem"
					description="Explore blockchain and cryptocurrency markets"
					progress={65}
					status="in-progress"
					modules={[
						{ name: "Blockchain Fundamentals", completed: true },
						{ name: "Cryptocurrency Markets", completed: true },
						{ name: "DeFi Protocols", completed: false },
						{ name: "Trading Strategies", completed: false },
					]}
				/>

				<LearningPathItem
					title="Advanced Trading Techniques"
					description="Master complex trading strategies"
					progress={0}
					status="locked"
					modules={[
						{ name: "Technical Analysis", completed: false },
						{ name: "Fundamental Analysis", completed: false },
						{ name: "Algorithmic Trading", completed: false },
					]}
				/>
			</CardContent>
		</Card>
	);
}