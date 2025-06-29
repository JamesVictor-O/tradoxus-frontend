// components/admin/Sidebar.tsx
"use client";

import Link from "next/link";
import {
  BookOpen,
  Users,
  Settings,
  BarChart2,
  FileText,
  Clock,
  Calendar,
  X,
  Sun,
  Moon,
  LayoutDashboard,
  CircleCheck,
  ChevronUp,
  CirclePlus,
} from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

interface SidebarProps {
  onClose?: () => void;
}

const Sidebar = ({ onClose }: SidebarProps = {}) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="w-full md:w-64 lg:w-72 xl:w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 h-full flex flex-col text-black dark:text-white transition-all duration-200">
      {/* Header Section */}
      <div className="p-3 sm:p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center p-2">
          <h1 className="text-lg sm:text-xl lg:text-2xl font-bold uppercase text-black dark:text-white">
            Tradoxus
          </h1>

          {onClose && (
            <button
              onClick={onClose}
              className="md:hidden p-1.5 sm:p-2 rounded-md text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-all duration-200"
              aria-label="Close sidebar"
            >
              <X size={20} className="sm:w-6 sm:h-6" />
            </button>
          )}
        </div>

        <div className="p-1 mt-2 sm:mt-3">
          <Link
            href="/admin/new-content"
            className="flex items-center gap-2 sm:gap-3 bg-black dark:bg-gray-700 text-white p-2.5 sm:p-3 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-all duration-200 text-sm sm:text-base font-medium"
            onClick={onClose}
          >
            <CirclePlus size={18} className="sm:w-5 sm:h-5" />
            <span>New Content</span>
          </Link>
        </div>
      </div>

      {/* Navigation Section */}
      <nav className="flex-1 overflow-y-auto p-2 sm:p-3">
        <ul className="space-y-1 sm:space-y-2">
          <li>
            <Link
              href="/admin"
              className="flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 font-medium transition-all duration-200 text-sm sm:text-base"
              onClick={onClose}
            >
              <LayoutDashboard size={18} className="sm:w-5 sm:h-5" />
              <span>Dashboard</span>
            </Link>
          </li>

          <li className="pt-2 sm:pt-3">
            <div className="flex items-center justify-between p-2 sm:p-2.5 text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">
              <span>Content Management</span>
              <ChevronUp size={14} className="sm:w-4 sm:h-4" />
            </div>
            <ul className="pl-2 sm:pl-3 mt-1 space-y-1">
              <li>
                <Link
                  href="/admin/content"
                  className="flex items-center gap-2 sm:gap-3 p-2 sm:p-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 text-sm sm:text-base"
                  onClick={onClose}
                >
                  <BookOpen size={16} className="sm:w-5 sm:h-5" />
                  <span>All Content</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/drafts"
                  className="flex items-center gap-2 sm:gap-3 p-2 sm:p-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 text-sm sm:text-base"
                  onClick={onClose}
                >
                  <FileText size={16} className="sm:w-5 sm:h-5" />
                  <span>Drafts</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/approval-queue"
                  className="flex items-center gap-2 sm:gap-3 p-2 sm:p-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 text-sm sm:text-base"
                  onClick={onClose}
                >
                  <CircleCheck size={16} className="sm:w-5 sm:h-5" />
                  <span>Approval Queue</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/scheduled"
                  className="flex items-center gap-2 sm:gap-3 p-2 sm:p-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 text-sm sm:text-base"
                  onClick={onClose}
                >
                  <Clock size={16} className="sm:w-5 sm:h-5" />
                  <span>Scheduled</span>
                </Link>
              </li>
            </ul>
          </li>

          <li className="pt-2 sm:pt-3">
            <div className="flex items-center justify-between p-2 sm:p-2.5 text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">
              <span>User Management</span>
              <ChevronUp size={14} className="sm:w-4 sm:h-4" />
            </div>
            <ul className="pl-2 sm:pl-3 mt-1 space-y-1">
              <li>
                <Link
                  href="/admin/users"
                  className="flex items-center gap-2 sm:gap-3 p-2 sm:p-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 text-sm sm:text-base"
                  onClick={onClose}
                >
                  <Users size={16} className="sm:w-5 sm:h-5" />
                  <span>All Users</span>
                </Link>
              </li>
            </ul>
          </li>

          <li className="pt-2 sm:pt-3">
            <div className="flex items-center justify-between p-2 sm:p-2.5 text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">
              <span>System Configuration</span>
              <ChevronUp size={14} className="sm:w-4 sm:h-4" />
            </div>
            <ul className="pl-2 sm:pl-3 mt-1 space-y-1">
              <li>
                <Link
                  href="/admin/settings"
                  className="flex items-center gap-2 sm:gap-3 p-2 sm:p-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 text-sm sm:text-base"
                  onClick={onClose}
                >
                  <Settings size={16} className="sm:w-5 sm:h-5" />
                  <span>General Settings</span>
                </Link>
              </li>
            </ul>
          </li>

          <li className="pt-2 sm:pt-3">
            <div className="flex items-center justify-between p-2 sm:p-2.5 text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">
              <span>Reporting</span>
              <ChevronUp size={14} className="sm:w-4 sm:h-4" />
            </div>
            <ul className="pl-2 sm:pl-3 mt-1 space-y-1">
              <li>
                <Link
                  href="/admin/analytics"
                  className="flex items-center gap-2 sm:gap-3 p-2 sm:p-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 text-sm sm:text-base"
                  onClick={onClose}
                >
                  <BarChart2 size={16} className="sm:w-5 sm:h-5" />
                  <span>Analytics</span>
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </nav>

      {/* Footer Section */}
      <div className="p-3 sm:p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between gap-2 sm:gap-3 md:gap-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-gray-800 dark:bg-gray-600 flex items-center justify-center text-white text-sm sm:text-base font-medium">
              A
            </div>
            <div className="min-w-0 flex-1">
              <div className="font-medium text-sm sm:text-base truncate">
                Admin User
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                admin@example.com
              </div>
            </div>
          </div>
          <button
            className="p-1.5 sm:p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-all duration-200"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Moon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500 dark:text-gray-400" />
            ) : (
              <Sun className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
