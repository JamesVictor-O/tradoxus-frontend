"use client";

import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => {
          const nextTheme = theme === "light" ? "dark" : theme === "dark" ? "system" : "light";
          setTheme(nextTheme);
        }}
        className="text-gray-300 hover:text-white transition-colors"
        aria-label={`Switch to ${theme === "light" ? "dark" : theme === "dark" ? "system" : "light"} theme`}
      >
        {theme === "dark" ? (
          <Moon className="h-5 w-5" />
        ) : theme === "system" ? (
          <Monitor className="h-5 w-5" />
        ) : (
          <Sun className="h-5 w-5" />
        )}
      </button>
    </div>
  );
} 