// components/admin/Header.tsx
"use client";

import { Search, Bell, Menu, Moon, Sun } from "lucide-react";

interface HeaderProps {
  onMenuButtonClick?: () => void;
}

const Header = ({ onMenuButtonClick }: HeaderProps = {}) => {

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 h-16 flex items-center px-4 md:px-6 sticky top-0 z-10 transition-colors duration-200">
      <button
        type="button"
        className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none transition-colors duration-200"
        onClick={onMenuButtonClick}
      >
        <Menu className="h-6 w-6" />
      </button>

      <div className="flex-1 relative mx-4 md:mx-0">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="h-5 w-5 text-gray-400 dark:text-gray-500" />
        </div>
        <input
          type="search"
          placeholder="Search..."
          className="w-full max-w-md pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
        />
      </div>
      <div className="flex items-center space-x-2">
    
        <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
          <Bell className="h-6 w-6 text-gray-500 dark:text-gray-400" />
        </button>
      </div>
    </header>
  );
};

export default Header;
