import { Calendar, Trophy, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChallengeCardProps {
	title: string;
	description: string;
	icon: LucideIcon;
	startDate: string;
	reward: string;
	status: "active" | "upcoming" | "completed";
}

export function ChallengeCard({
	title,
	description,
	icon: Icon,
	startDate,
	reward,
	status,
}: ChallengeCardProps) {
	return (
		<div className="border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-950 p-4">
			<div className="flex items-start justify-between">
				<div className="space-y-1">
					<div className="flex items-center gap-2">
						<Icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
						<h3 className="font-medium text-gray-900 dark:text-white">{title}</h3>
					</div>
					<p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
				</div>
				<button
					className={cn(
						"py-1.5 px-3 text-sm font-medium rounded-md transition-colors",
						status === "active"
							? "bg-blue-600 hover:bg-blue-700 text-white"
							: "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white"
					)}
				>
					{status === "active"
						? "Participate"
						: status === "upcoming"
						? "Join"
						: "View Results"}
				</button>
			</div>
			<div className="mt-4 flex items-center justify-between text-sm">
				<div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
					<Calendar className="h-4 w-4" />
					<span>{startDate}</span>
				</div>
				<div className="flex items-center gap-1 text-amber-600 dark:text-amber-400">
					<Trophy className="h-4 w-4" />
					<span>{reward}</span>
				</div>
			</div>
		</div>
	);
}