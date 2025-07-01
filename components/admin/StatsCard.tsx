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
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 p-3 sm:p-4 md:p-5 lg:p-6 text-black dark:text-white w-full h-full">
      <div className="flex justify-between items-start h-full gap-2 sm:gap-3 md:gap-4">
        <div className="flex-1 min-w-0">
          {/* Title */}
          <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm md:text-base lg:text-lg font-medium truncate leading-tight">
            {title}
          </p>

          {/* Value */}
          <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold mt-1 sm:mt-1.5 md:mt-2 lg:mt-3 truncate leading-tight">
            {value}
          </h3>

          {/* Change Indicator */}
          <div className="mt-1 sm:mt-1.5 md:mt-2 lg:mt-3">
            <span
              className={`text-xs sm:text-sm md:text-base font-medium ${
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
            <div className="mt-2 sm:mt-2.5 md:mt-3 lg:mt-4 w-full bg-gray-200 dark:bg-gray-600 rounded-full h-1 sm:h-1.5 md:h-2 lg:h-2.5 overflow-hidden">
              <div
                className="bg-black dark:bg-blue-500 h-1 sm:h-1.5 md:h-2 lg:h-2.5 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progressValue}%` }}
              ></div>
            </div>
          )}
        </div>

        {/* Icon Container */}
        <div className="p-1.5 sm:p-2 md:p-2.5 lg:p-3 bg-gray-100 dark:bg-gray-700 rounded-lg flex-shrink-0 self-start">
          <div className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 flex items-center justify-center">
            {icon}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
