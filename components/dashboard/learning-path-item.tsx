import { useState } from "react";
import { CheckCircle, ChevronRight, Clock, Coins } from "lucide-react";
import { cn } from "@/lib/utils";

interface Module {
	name: string;
	completed: boolean;
}

interface LearningPathItemProps {
	title: string;
	description: string;
	progress: number;
	status: "completed" | "in-progress" | "locked";
	modules: Module[];
}

export function LearningPathItem({
	title,
	description,
	progress,
	status,
	modules,
}: LearningPathItemProps) {
	const [expanded, setExpanded] = useState(status === "in-progress");

	return (
		<div className="space-y-2">
			<div
				className="flex cursor-pointer items-center justify-between"
				onClick={() => setExpanded(!expanded)}
			>
				<div className="space-y-1">
					<div className="flex items-center gap-2">
						{status === "completed" && <CheckCircle className="h-5 w-5 text-green-500" />}
						{status === "in-progress" && <Coins className="h-5 w-5 text-blue-500" />}
						{status === "locked" && <Clock className="h-5 w-5 text-gray-500" />}
						<h3 className="font-medium text-white">{title}</h3>
					</div>
					<p className="text-sm text-gray-400">{description}</p>
				</div>
				<div className="flex items-center gap-2">
					{status === "completed" && (
						<span className="px-2 py-1 text-xs font-medium rounded-full bg-green-500/20 text-green-400">
							Completed
						</span>
					)}
					{status === "in-progress" && (
						<span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-500/20 text-blue-400">
							In Progress
						</span>
					)}
					{status === "locked" && (
						<span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-700 text-gray-400">
							Locked
						</span>
					)}
					<ChevronRight
						className={`h-4 w-4 text-gray-400 transition-transform ${
							expanded ? "rotate-90" : ""
						}`}
					/>
				</div>
			</div>

			<div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
				<div
					className={cn(
						"h-full rounded-full",
						status === "completed"
							? "bg-green-500"
							: status === "in-progress"
							? "bg-blue-500"
							: "bg-gray-700"
					)}
					style={{ width: `${progress}%` }}
				></div>
			</div>

			{expanded && (
				<div className="mt-4 space-y-2 rounded-md border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 p-3">
					{modules.map((module, index) => (
						<div key={index} className="flex items-center justify-between">
							<div className="flex items-center gap-2">
								{module.completed ? (
									<CheckCircle className="h-4 w-4 text-green-500" />
								) : (
									<div className="h-4 w-4 rounded-full border-2 border-gray-300 dark:border-gray-700" />
								)}
								<span
									className={`text-sm ${
										module.completed ? "text-gray-900 dark:text-white" : "text-gray-600 dark:text-gray-400"
									}`}
								>
									{module.name}
								</span>
							</div>
							{module.completed ? (
								<span className="px-2 py-0.5 text-xs rounded-full bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20">
									Completed
								</span>
							) : (
								<button className="px-2 py-0.5 text-xs rounded-md bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white transition-colors">
									Start
								</button>
							)}
						</div>
					))}
				</div>
			)}
		</div>
	);
}