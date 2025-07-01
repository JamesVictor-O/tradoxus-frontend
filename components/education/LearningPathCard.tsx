import {
  Check,
  CheckCircle,
  Circle,
  CircleCheck,
  type LucideIcon,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface Module {
  title: string;
  completed: boolean;
}

interface LearningPathCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  modules: Module[];
  progress: number;
  totalModules: number;
  isActive?: boolean;
}

export function LearningPathCard({
  title,
  description,
  icon: Icon,
  difficulty,
  modules,
  progress,
  totalModules,
  isActive = false,
}: LearningPathCardProps) {
  const difficultyColors = {
    Beginner: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    Intermediate: "bg-purple-500/10 text-purple-500 border-purple-500/20",
    Advanced: "bg-green-500/10 text-green-500 border-green-500/20",
  };

  const difficultyIconColors = {
    Beginner:
      "text-blue-500 bg-blue-500/10 rounded-full p-1.5 sm:p-2 w-8 h-8 sm:w-10 sm:h-10",
    Intermediate:
      "text-purple-500 bg-purple-500/10 rounded-full p-1.5 sm:p-2 w-8 h-8 sm:w-10 sm:h-10",
    Advanced:
      "text-green-500 bg-green-500/10 rounded-full p-1.5 sm:p-2 w-8 h-8 sm:w-10 sm:h-10",
  };

  const progressColor = {
    Beginner: "bg-blue-500",
    Intermediate: "bg-purple-500",
    Advanced: "bg-green-500",
  };

  const buttonColor = {
    Beginner: "bg-blue-600 hover:bg-blue-700 text-white",
    Intermediate: "bg-purple-600 hover:bg-purple-700 text-white",
    Advanced: "bg-green-600 hover:bg-green-700 text-white",
  };

  return (
    <Card className="bg-white dark:bg-gray-900/50 border-gray-200 dark:border-gray-800/50 hover:border-gray-300 dark:hover:border-gray-700/50 transition-colors h-full flex flex-col">
      <CardHeader className="space-y-2 pb-3 sm:pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <Icon className={difficultyIconColors[difficulty]} />
          </div>
          <span
            className={cn(
              "px-2 py-0.5 sm:px-2.5 sm:py-1 text-xs font-medium rounded-full border",
              difficultyColors[difficulty]
            )}
          >
            {difficulty}
          </span>
        </div>
        <CardTitle className="text-lg sm:text-xl font-medium text-gray-900 dark:text-white leading-tight">
          {title}
        </CardTitle>
        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 min-h-[2.5rem] sm:min-h-[2.75rem] w-full sm:w-3/4 line-clamp-2">
          {description}
        </p>
        <div className="space-y-2">
          <div className="flex justify-between text-xs sm:text-sm">
            <span className="text-gray-600 dark:text-gray-400">Progress</span>
            <span className="text-gray-900 dark:text-white font-medium">
              {progress}/{totalModules} Modules
            </span>
          </div>
          <div className="h-1.5 rounded-full bg-gray-100 dark:bg-gray-800/50">
            <div
              className={`h-full rounded-full ${progressColor[difficulty]}`}
              style={{ width: `${(progress / totalModules) * 100}%` }}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow px-3 sm:px-6">
        <div className="space-y-2 sm:space-y-3">
          {modules.map((module, index) => (
            <div
              key={`${module.title}-${index}`}
              className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-600 dark:text-gray-300"
            >
              {module.completed ? (
                <div className="flex items-center justify-center h-4 w-4 sm:h-5 sm:w-5 rounded-full border border-green-500/50 bg-green-500/10 dark:border-green-900/50 dark:bg-green-900/50 flex-shrink-0 text-xs font-medium">
                  <Check className="h-3 w-2.5 sm:h-4 sm:w-3 text-green-600 dark:text-green-300 flex-shrink-0" />
                </div>
              ) : (
                <div className="flex items-center justify-center h-4 w-4 sm:h-5 sm:w-5 rounded-full border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800/50 flex-shrink-0 text-xs font-medium text-gray-600 dark:text-gray-400">
                  {index + 1}
                </div>
              )}
              <span className="line-clamp-1 flex-1">{module.title}</span>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="pt-3 sm:pt-4 px-3 sm:px-6 border-t border-gray-200 dark:border-gray-800/50">
        <div className="w-full space-y-3 sm:space-y-4">
          <button
            className={cn(
              "w-full py-2 sm:py-2.5 px-3 sm:px-4 rounded-lg font-medium transition-colors text-xs sm:text-sm",
              isActive
                ? buttonColor[difficulty]
                : "bg-gray-100 dark:bg-gray-800/50 hover:bg-gray-200 dark:hover:bg-gray-700/50 text-gray-900 dark:text-white"
            )}
          >
            {isActive ? "Continue Learning" : "Start Path"}
          </button>
        </div>
      </CardFooter>
    </Card>
  );
}
