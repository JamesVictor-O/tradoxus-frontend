import { type LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface MetricCardProps {
	title: string;
	value: string;
	description: string;
	icon: LucideIcon;
	color: string;
}

export function MetricCard({ title, value, description, icon: Icon, color }: MetricCardProps) {
	return (
		<Card className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 w-full">
			<CardContent className="p-3 sm:p-4 md:p-5 lg:p-6">
				<div className="flex items-center justify-between mb-2 sm:mb-3">
					<h3 className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400 truncate pr-2">
						{title}
					</h3>
					<div className={`rounded-full p-1 sm:p-1.5 flex-shrink-0 ${color}`}>
						<Icon className="h-3 w-3 sm:h-4 sm:w-4" />
					</div>
				</div>
				<div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-1 sm:mb-2 break-words">
					{value}
				</div>
				<p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-tight">
					{description}
				</p>
			</CardContent>
		</Card>
	);
}