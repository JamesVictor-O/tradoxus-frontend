// components/admin/Header.tsx
"use client";

import { Search, Bell, Menu, Moon, Sun } from "lucide-react";

interface HeaderProps {
  onMenuButtonClick?: () => void;
}

const Header = ({ onMenuButtonClick }: HeaderProps = {}) => {
  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 h-14 sm:h-16 md:h-18 flex items-center px-3 sm:px-4 md:px-6 lg:px-8 sticky top-0 z-10 transition-colors duration-200">
      <button
        type="button"
        className="md:hidden inline-flex items-center justify-center p-1.5 sm:p-2 rounded-md text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-all duration-200"
        onClick={onMenuButtonClick}
        aria-label="Toggle menu"
      >
        <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
      </button>

      <div className="flex-1 relative mx-2 sm:mx-3 md:mx-4 lg:mx-6">
        <div className="absolute inset-y-0 left-0 flex items-center pl-2 sm:pl-3 pointer-events-none">
          <Search className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 dark:text-gray-500" />
        </div>
        <input
          type="search"
          placeholder="Search..."
          className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl pl-8 sm:pl-10 pr-2 sm:pr-3 py-1.5 sm:py-2 md:py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-500 dark:placeholder-gray-400"
        />
      </div>

      <div className="flex items-center space-x-1 sm:space-x-2 md:space-x-3">
        <button
          className="p-1.5 sm:p-2 md:p-2.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-all duration-200"
          aria-label="Notifications"
        >
          <Bell className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-gray-500 dark:text-gray-400" />
        </button>
      </div>
    </header>
  );
};

export default Header;
