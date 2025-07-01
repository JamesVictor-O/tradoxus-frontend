// app/admin/page.tsx
import { BookOpen, Users, Calendar, Clock, CirclePlus } from "lucide-react";
import Link from "next/link";
import StatsCard from "@/components/admin/StatsCard";
import RecentContentList from "@/components/admin/RecentContentList";
import ActivityFeed from "@/components/admin/ActivityFeed";
import {
  getMockDashboardStats,
  getMockRecentCourses,
  getMockRecentActivities,
} from "@/lib/mock-data";

export default function AdminDashboardPage() {
  // In a real app, you would fetch this data from an API
  // For now, we'll use our mock data service
  const stats = getMockDashboardStats();
  const recentCourses = getMockRecentCourses();
  const recentActivities = getMockRecentActivities();

  return (
    <div className="w-full min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="space-y-6 sm:space-y-8 text-black dark:text-white">
          
          {/* Header Section */}
          <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight">
                Dashboard
              </h1>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-1">
                Welcome back! Here's what's happening with your courses.
              </p>
            </div>
            
            <Link
              href="/admin/new-course"
              className="inline-flex items-center justify-center gap-2 bg-black dark:bg-gray-700 text-white px-4 py-2.5 sm:px-6 sm:py-3 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-all duration-200 text-sm sm:text-base font-medium shadow-sm hover:shadow-md w-full sm:w-auto"
            >
              <CirclePlus className="h-4 w-4 sm:h-5 sm:w-5" />
              <span>New Course</span>
            </Link>
          </div>

          {/* Stats Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
            <div className="w-full">
              <StatsCard
                title="Total Courses"
                value={stats.totalCourses.toString()}
                change={`+${stats.newCourses} new this week`}
                icon={<BookOpen className="h-5 w-5 sm:h-6 sm:w-6" />}
              />
            </div>
            
            <div className="w-full">
              <StatsCard
                title="Total Users"
                value={stats.totalUsers.toString()}
                change={`+${stats.newUsers} new this week`}
                icon={<Users className="h-5 w-5 sm:h-6 sm:w-6" />}
              />
            </div>
            
            <div className="w-full">
              <StatsCard
                title="Total Enrollments"
                value={stats.totalEnrollments.toString()}
                change={`${stats.completionRate}% completion`}
                icon={<Calendar className="h-5 w-5 sm:h-6 sm:w-6" />}
                showProgress
                progressValue={stats.completionRate}
              />
            </div>
            
            <div className="w-full">
              <StatsCard
                title="Pending Approvals"
                value={stats.pendingApprovals.toString()}
                change="Review now"
                icon={<Clock className="h-5 w-5 sm:h-6 sm:w-6" />}
                isAction
              />
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 sm:gap-8">
            {/* Recent Content - Takes 2/3 width on large screens */}
            <div className="xl:col-span-2 w-full">
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg sm:rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="p-4 sm:p-6 lg:p-8">
                  <RecentContentList courses={recentCourses} />
                </div>
              </div>
            </div>
            
            {/* Activity Feed - Takes 1/3 width on large screens */}
            <div className="xl:col-span-1 w-full">
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg sm:rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 h-full">
                <div className="p-4 sm:p-6 lg:p-8 h-full">
                  <ActivityFeed activities={recentActivities} />
                </div>
              </div>
            </div>
          </div>
          
          {/* Additional spacing at bottom for mobile scroll */}
          <div className="h-4 sm:h-6"></div>
        </div>
      </div>
    </div>
  );
}