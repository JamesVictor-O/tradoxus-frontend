import { useState } from "react";
import { CheckCircle, ChevronRight, Clock, Coins } from "lucide-react";

interface ClassValue {
	[key: string]: boolean | undefined | null;
}

type CnArg = string | undefined | null | false;

const cn = (...classes: CnArg[]): string => classes.filter(Boolean).join(' ');

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
		<div className="space-y-3 p-4 sm:p-6">
			<div
				className="flex cursor-pointer items-start sm:items-center justify-between gap-3 sm:gap-4"
				onClick={() => setExpanded(!expanded)}
			>
				{/* Left side content */}
				<div className="flex-1 min-w-0 space-y-2">
					<div className="flex items-center gap-2 flex-wrap">
						{status === "completed" && <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 flex-shrink-0" />}
						{status === "in-progress" && <Coins className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500 flex-shrink-0" />}
						{status === "locked" && <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500 flex-shrink-0" />}
						<h3 className="font-medium text-white text-sm sm:text-base break-words">{title}</h3>
					</div>
					<p className="text-xs sm:text-sm text-gray-400 break-words pr-2">{description}</p>
				</div>

				{/* Right side content */}
				<div className="flex flex-col sm:flex-row items-end sm:items-center gap-2 sm:gap-3 flex-shrink-0">
					{/* Status badges - stack on mobile, inline on desktop */}
					<div className="flex flex-col sm:flex-row gap-1 sm:gap-2">
						{status === "completed" && (
							<span className="px-2 py-1 text-xs font-medium rounded-full bg-green-500/20 text-green-400 whitespace-nowrap text-center">
								Completed
							</span>
						)}
						{status === "in-progress" && (
							<span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-500/20 text-blue-400 whitespace-nowrap text-center">
								In Progress
							</span>
						)}
						{status === "locked" && (
							<span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-700 text-gray-400 whitespace-nowrap text-center">
								Locked
							</span>
						)}
					</div>
					<ChevronRight
						className={`h-4 w-4 text-gray-400 transition-transform flex-shrink-0 ${
							expanded ? "rotate-90" : ""
						}`}
					/>
				</div>
			</div>

			{/* Progress bar */}
			<div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
				<div
					className={cn(
						"h-full rounded-full transition-all duration-300",
						status === "completed"
							? "bg-green-500"
							: status === "in-progress"
							? "bg-blue-500"
							: "bg-gray-700"
					)}
					style={{ width: `${progress}%` }}
				></div>
			</div>

			{/* Expanded modules section */}
			{expanded && (
				<div className="mt-4 space-y-3 rounded-md border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 p-3 sm:p-4">
					{modules.map((module, index) => (
						<div key={`${module.name}-${index}`} className="flex items-start sm:items-center justify-between gap-3">
							<div className="flex items-start sm:items-center gap-2 flex-1 min-w-0">
								{module.completed ? (
									<CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5 sm:mt-0" />
								) : (
									<div className="h-4 w-4 rounded-full border-2 border-gray-300 dark:border-gray-700 flex-shrink-0 mt-0.5 sm:mt-0" />
								)}
								<span
									className={`text-xs sm:text-sm break-words ${
										module.completed ? "text-gray-900 dark:text-white" : "text-gray-600 dark:text-gray-400"
									}`}
								>
									{module.name}
								</span>
							</div>
							<div className="flex-shrink-0">
								{module.completed ? (
									<span className="px-2 py-0.5 text-xs rounded-full bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20 whitespace-nowrap">
										Completed
									</span>
								) : (
									<button 
										type="button" 
										className="px-3 py-1 text-xs rounded-md bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white transition-colors whitespace-nowrap active:scale-95"
									>
										Start
									</button>
								)}
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
}

// Demo component to show responsive behavior
export default function Demo() {
	const sampleModules = [
		{ name: "Introduction to React Fundamentals and Core Concepts", completed: true },
		{ name: "Understanding JSX Syntax and Best Practices", completed: true },
		{ name: "State Management with useState Hook", completed: false },
		{ name: "Advanced Component Lifecycle Methods", completed: false },
	];

	return (
		<div className="min-h-screen bg-gray-900 p-4">
			<div className="max-w-4xl mx-auto space-y-6">
				<h1 className="text-2xl font-bold text-white mb-8">Learning Path - Responsive Demo</h1>
				
				<div className="bg-gray-800 rounded-lg overflow-hidden">
					<LearningPathItem
						title="React Fundamentals Course"
						description="Master the core concepts of React including components, state, props, and lifecycle methods. This comprehensive course covers everything you need to build modern web applications."
						progress={60}
						status="in-progress"
						modules={sampleModules}
					/>
				</div>

				<div className="bg-gray-800 rounded-lg overflow-hidden">
					<LearningPathItem
						title="Advanced JavaScript Patterns"
						description="Deep dive into advanced JavaScript concepts and design patterns"
						progress={100}
						status="completed"
						modules={[
							{ name: "Closures and Scope", completed: true },
							{ name: "Async/Await Patterns", completed: true },
						]}
					/>
				</div>

				<div className="bg-gray-800 rounded-lg overflow-hidden">
					<LearningPathItem
						title="TypeScript Mastery"
						description="Learn TypeScript from beginner to advanced level"
						progress={0}
						status="locked"
						modules={[
							{ name: "Basic Types", completed: false },
							{ name: "Interfaces", completed: false },
						]}
					/>
				</div>
			</div>
		</div>
	);
}