// components/admin/RecentContentList.tsx
import { MoreHorizontal } from "lucide-react";
import { Course } from "@/lib/mock-data";

interface RecentContentListProps {
  courses: Course[];
}

const RecentContentList = ({ courses }: RecentContentListProps) => {
  return (
    <div className="text-black dark:text-white w-full">
      {/* Header Section */}
      <div className="mb-4 md:mb-6">
        <h2 className="text-lg sm:text-xl font-semibold">
          Recent Content
        </h2>
        <p className="text-sm sm:text-base text-gray-500 dark:text-gray-300 mt-1">
          Recently created and updated courses
        </p>
      </div>

      {/* Courses List */}
      <div className="space-y-3 sm:space-y-4">
        {courses.map((course) => (
          <div
            key={course.id}
            className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 hover:bg-gray-400 dark:hover:bg-gray-800/50 rounded-lg transition-colors"
          >
            {/* Course Thumbnail */}
            <div className="flex-shrink-0">
              <div className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
            </div>

            {/* Course Info */}
            <div className="flex-grow min-w-0 space-y-1">
              <h3 className="font-medium text-sm sm:text-base md:text-[15px] truncate">
                {course.title}
              </h3>
              <div className="flex flex-wrap items-center gap-x-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                <span>{course.level}</span>
                <span>•</span>
                <span className="truncate">By {course.author}</span>
              </div>
            </div>

            {/* Status & Actions */}
            <div className="flex-shrink-0 flex items-center gap-2">
              <div
                className={`h-2 w-2 rounded-full ${
                  course.status === "published"
                    ? "bg-green-500"
                    : "bg-yellow-500"
                }`}
              ></div>
              <button 
                className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                aria-label="More options"
              >
                <MoreHorizontal
                  size={16}
                  className="text-gray-500 dark:text-gray-400"
                />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentContentList;