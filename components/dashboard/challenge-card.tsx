import { Calendar, Trophy, Code, Users, Target } from "lucide-react";

interface CnClass {
	toString(): string;
}

type CnArg = string | undefined | null | false | 0 | CnClass;

const cn = (...classes: CnArg[]): string => classes.filter(Boolean).join(" ");

interface ChallengeCardProps {
  title: string;
  description: string;
 icon: React.ComponentType<{ className?: string; size?: number }>;
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
    <div className="border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-950 p-4 sm:p-6 hover:shadow-lg transition-shadow">
      {/* Header section - responsive flex */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        {/* Left content */}
        <div className="flex-1 min-w-0 space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
            <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
            <h3 className="font-medium text-gray-900 dark:text-white text-sm sm:text-base break-words">
              {title}
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 break-words leading-relaxed">
            {description}
          </p>
        </div>

        {/* Action button - responsive sizing */}
        <div className="flex-shrink-0 w-full sm:w-auto">
          <button
            type="button"
            className={cn(
              "w-full sm:w-auto py-2 px-4 text-xs sm:text-sm font-medium rounded-md transition-all duration-200 active:scale-95",
              status === "active"
                ? "bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow-md"
                : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white"
            )}
          >
            {status === "active"
              ? "Participate"
              : status === "upcoming"
              ? "Join Waitlist"
              : "View Results"}
          </button>
        </div>
      </div>

      {/* Footer section - responsive layout */}
      <div className="mt-4 sm:mt-6 flex flex-col xs:flex-row xs:items-center xs:justify-between gap-3 xs:gap-4">
        {/* Start date */}
        <div className="flex items-center gap-1.5 text-gray-600 dark:text-gray-400">
          <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0" />
          <span className="text-xs sm:text-sm font-medium truncate">
            {startDate}
          </span>
        </div>

        {/* Reward */}
        <div className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400">
          <Trophy className="h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0" />
          <span className="text-xs sm:text-sm font-medium truncate">
            {reward}
          </span>
        </div>
      </div>

      {/* Status indicator */}
      <div className="mt-3 sm:mt-4">
        <div className="flex justify-between items-center">
          <span
            className={cn(
              "inline-flex px-2 py-1 text-xs font-medium rounded-full",
              status === "active"
                ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                : status === "upcoming"
                ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400"
                : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400"
            )}
          >
            {status === "active"
              ? "🔥 Active"
              : status === "upcoming"
              ? "⏳ Coming Soon"
              : "✅ Completed"}
          </span>
        </div>
      </div>
    </div>
  );
}

// Demo component to show responsive behavior
export default function Demo() {
  const challenges = [
    {
      title: "30-Day Coding Challenge",
      description:
        "Complete daily coding exercises to improve your programming skills and build consistency in your learning journey.",
      icon: Code,
      startDate: "January 1, 2025",
      reward: "500 XP + Certificate",
      status: "active" as const,
    },
    {
      title: "Team Collaboration Sprint",
      description:
        "Work with other learners on a collaborative project to practice version control, code reviews, and agile methodologies.",
      icon: Users,
      startDate: "February 15, 2025",
      reward: "1000 XP + Badge",
      status: "upcoming" as const,
    },
    {
      title: "Algorithm Mastery Challenge",
      description:
        "Solve complex algorithmic problems and compete with peers in this intensive problem-solving competition.",
      icon: Target,
      startDate: "December 1, 2024",
      reward: "Premium Course Access",
      status: "completed" as const,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6 sm:mb-8">
          Challenge Cards - Responsive Demo
        </h1>

        {/* Grid layout - responsive columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
          {challenges.map((challenge, index) => (
            <ChallengeCard
              key={challenge.title}
              title={challenge.title}
              description={challenge.description}
              icon={challenge.icon}
              startDate={challenge.startDate}
              reward={challenge.reward}
              status={challenge.status}
            />
          ))}
        </div>

        {/* Single card example for testing long content */}
        <div className="mt-8 max-w-md mx-auto">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Long Content Test
          </h2>
          <ChallengeCard
            title="Super Long Challenge Title That Might Wrap on Mobile Devices"
            description="This is a very long description that demonstrates how the card handles extensive text content across different screen sizes and ensures proper text wrapping and layout preservation."
            icon={Code}
            startDate="March 30, 2025"
            reward="Premium Subscription + Mentorship"
            status="upcoming"
          />
        </div>
      </div>
    </div>
  );
}
