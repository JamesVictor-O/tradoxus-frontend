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
    <div className="w-full md:w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 h-full flex flex-col text-black dark:text-white transition-colors duration-200">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 ">
        <div className="flex justify-between items-center p-2">
          <h1 className="text-xl font-bold uppercase text-black dark:text-white">
            Tradoxus
          </h1>

          {onClose && (
            <button
              onClick={onClose}
              className="md:hidden rounded-md text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none"
            >
              <X size={24} />
            </button>
          )}
        </div>

        <div className="p-1">
          <Link
            href="/admin/new-content"
            className="flex items-center gap-2 bg-black dark:bg-gray-700 text-white p-3 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition duration-200"
            onClick={onClose}
          >
            <CirclePlus size={20} />
            <span>New Content</span>
          </Link>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto p-2">
        <ul className="space-y-1">
          <li>
            <Link
              href="/admin"
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 font-medium transition-colors duration-200"
              onClick={onClose}
            >
              <LayoutDashboard size={20} />
              <span>Dashboard</span>
            </Link>
          </li>

          <li className="pt-2">
            <div className="flex items-center justify-between p-2 text-sm font-medium text-gray-500 dark:text-gray-400">
              <span>Content Management</span>
              <ChevronUp size={16} />
            </div>
            <ul className="pl-2 mt-1 space-y-1">
              <li>
                <Link
                  href="/admin/content"
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                  onClick={onClose}
                >
                  <BookOpen size={20} />
                  <span>All Content</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/drafts"
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                  onClick={onClose}
                >
                  <FileText size={20} />
                  <span>Drafts</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/approval-queue"
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                  onClick={onClose}
                >
                  <CircleCheck size={20} />
                  <span>Approval Queue</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/scheduled"
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                  onClick={onClose}
                >
                  <Clock size={20} />
                  <span>Scheduled</span>
                </Link>
              </li>
            </ul>
          </li>

          <li className="pt-2">
            <div className="flex items-center justify-between p-2 text-sm font-medium text-gray-500 dark:text-gray-400">
              <span>User Management</span>
              <ChevronUp size={16} />
            </div>
            <ul className="pl-2 mt-1 space-y-1">
              <li>
                <Link
                  href="/admin/users"
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                  onClick={onClose}
                >
                  <Users size={20} />
                  <span>All Users</span>
                </Link>
              </li>
            </ul>
          </li>

          <li className="pt-2">
            <div className="flex items-center justify-between p-2 text-sm font-medium text-gray-500 dark:text-gray-400">
              <span>System Configuration</span>
              <ChevronUp size={16} />
            </div>
            <ul className="pl-2 mt-1 space-y-1">
              <li>
                <Link
                  href="/admin/settings"
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                  onClick={onClose}
                >
                  <Settings size={20} />
                  <span>General Settings</span>
                </Link>
              </li>
            </ul>
          </li>

          <li className="pt-2">
            <div className="flex items-center justify-between p-2 text-sm font-medium text-gray-500 dark:text-gray-400">
              <span>Reporting</span>
              <ChevronUp size={16} />
            </div>
            <ul className="pl-2 mt-1 space-y-1">
              <li>
                <Link
                  href="/admin/analytics"
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                  onClick={onClose}
                >
                  <BarChart2 size={20} />
                  <span>Analytics</span>
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-gray-800 dark:bg-gray-600 flex items-center justify-center text-white">
              A
            </div>
            <div>
              <div className="font-medium">Admin User</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                admin@example.com
              </div>
            </div>
          </div>
          <button
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Moon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            ) : (
              <Sun className="h-5 w-5 text-gray-500" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
