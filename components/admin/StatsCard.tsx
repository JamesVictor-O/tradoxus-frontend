// components/admin/StatsCard.tsx
import { ReactNode } from "react";

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  icon: ReactNode;
  showProgress?: boolean;
  progressValue?: number;
  isAction?: boolean;
}

const StatsCard = ({
  title,
  value,
  change,
  icon,
  showProgress = false,
  progressValue = 0,
  isAction = false,
}: StatsCardProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm p-4 sm:p-5 lg:p-6 text-black dark:text-white w-full h-full">
      <div className="flex justify-between items-start h-full">
        <div className="flex-1 min-w-0">
          {/* Title */}
          <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm md:text-base truncate">
            {title}
          </p>
          
          {/* Value */}
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mt-1 sm:mt-2 truncate">
            {value}
          </h3>
          
          {/* Change Indicator */}
          <div className="mt-1 sm:mt-2">
            <span
              className={`text-xs sm:text-sm ${
                isAction
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-gray-500 dark:text-gray-400"
              }`}
            >
              {change}
            </span>
          </div>
          
          {/* Progress Bar */}
          {showProgress && (
            <div className="mt-2 sm:mt-3 md:mt-4 w-full bg-gray-200 dark:bg-gray-600 rounded-full h-1.5 sm:h-2 md:h-2.5">
              <div
                className="bg-black dark:bg-blue-500 h-1.5 sm:h-2 md:h-2.5 rounded-full"
                style={{ width: `${progressValue}%` }}
              ></div>
            </div>
          )}
        </div>
        
        {/* Icon Container */}
        <div className="p-1 sm:p-1.5 md:p-2 bg-gray-100 dark:bg-gray-700 rounded-lg ml-2 sm:ml-3 flex-shrink-0">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatsCard;