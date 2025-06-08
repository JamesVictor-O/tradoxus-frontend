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
		<Card className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
			<CardContent className="p-4">
				<div className="flex items-center justify-between mb-2">
					<h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</h3>
					<div className={`rounded-full p-1 ${color}`}>
						<Icon className="h-4 w-4" />
					</div>
				</div>
				<div className="text-2xl font-bold text-gray-900 dark:text-white">{value}</div>
				<p className="text-xs text-gray-600 dark:text-gray-400">{description}</p>
			</CardContent>
		</Card>
	);
}