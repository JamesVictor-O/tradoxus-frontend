// components/admin/ActivityFeed.tsx
import { BookOpen, CheckSquare, FileText, MessageSquare } from "lucide-react";
import { ReactNode } from "react";
import { Activity } from "@/lib/mock-data";

interface ActivityFeedProps {
  activities: Activity[];
}

const getActivityIcon = (type: string): ReactNode => {
  switch (type) {
    case "enrolled":
      return <BookOpen className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500" />;
    case "completed":
      return <CheckSquare className="h-4 w-4 sm:h-5 sm:w-5 text-green-500" />;
    case "created":
      return <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-purple-500" />;
    case "comment":
      return <MessageSquare className="h-4 w-4 sm:h-5 sm:w-5 text-orange-500" />;
    default:
      return <BookOpen className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500 dark:text-gray-400" />;
  }
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
};

const ActivityFeed = ({ activities }: ActivityFeedProps) => {
  return (
    <div className="text-black dark:text-white w-full">
      {/* Header Section */}
      <div className="mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-xl font-semibold">Recent Activity</h2>
        <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mt-1">
          Latest platform activities
        </p>
      </div>

      {/* Activities List */}
      <div className="space-y-4 sm:space-y-6">
        {activities.map((activity) => (
          <div 
            key={activity.id} 
            className="flex gap-3 sm:gap-4 p-2 sm:p-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-lg transition-colors"
          >
            {/* Activity Icon */}
            <div className="mt-0.5 sm:mt-1 flex-shrink-0">
              {getActivityIcon(activity.activityType)}
            </div>

            {/* Activity Details */}
            <div className="flex-grow min-w-0">
              <div className="font-medium text-sm sm:text-base">
                {activity.userName}
              </div>
              <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mt-0.5">
                {activity.activityType === "enrolled" &&
                  `Enrolled in the course ${activity.targetName}`}
                {activity.activityType === "completed" &&
                  `Completed the course ${activity.targetName}`}
                {activity.activityType === "created" &&
                  `Created a new draft course ${activity.targetName}`}
                {activity.activityType === "comment" &&
                  `Left a comment on ${activity.targetName}`}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {formatDate(activity.timestamp)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityFeed;