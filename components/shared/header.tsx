// components/Header.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Menu, X, Wallet } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useWallet } from "@/context/WalletProviderContext";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useTheme } from "@/context/ThemeContext";

const navLinks = [
  { name: "Modules", path: "/modules" },
  { name: "Problem", path: "/problem" },
  { name: "Solution", path: "/solution" },
  { name: "Benefits", path: "/benefits" },
  { name: "Gamification", path: "/gamification" },
  { name: "Web3", path: "/web3" },
  { name: "Dashboard", path: "/dashboard" },
  { name: "Profile", path: "/tradingdemo" },
  { name: "Journal", path: "/journal" },
];

// Navigation structure with dropdowns
const navigationStructure = [
  { name: "Home", path: "/", dropdown: false },
  {
    name: "Learning",
    path: "#",
    dropdown: true,
    items: [
      { name: "Modules", path: "/modules" },
      { name: "Problem", path: "/problem" },
    ],
  },
  {
    name: "Features",
    path: "#",
    dropdown: true,
    items: [
      { name: "Solution", path: "/solution" },
      { name: "Benefits", path: "/benefits" },
      { name: "Gamification", path: "/gamification" },
      { name: "Journal", path: "/journal" },
    ],
  },
  { name: "Web3", path: "/web3", dropdown: false },
  {
    name: "User",
    path: "#",
    dropdown: true,
    items: [
      { name: "Dashboard", path: "/dashboard" },
      { name: "Profile", path: "/profile" },
    ],
  },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState<Record<string, boolean>>({});
  const { walletAddress, isConnecting, connectWallet, disconnectWallet } = useWallet();
  const pathname = usePathname();
  const dropdownRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const navRef = useRef<HTMLElement>(null);
  const { theme } = useTheme();

  // Check if a path is active (exact match or child route)
  const isActivePath = (path: string) => {
    if (path === "/") return pathname === "/";
    return (
      pathname === path || (path !== "#" && pathname.startsWith(path + "/"))
    );
  };

  // Check if any item in a dropdown is active
  const isActiveDropdown = (items: { path: string }[]) => {
    return items.some((item) => isActivePath(item.path));
  };

  // Toggle dropdown on mobile
  const toggleDropdown = (name: string) => {
    setOpenDropdowns((prev) => {
      const allClosed = Object.keys(prev).reduce((acc, key) => {
        acc[key] = false;
        return acc;
      }, {} as Record<string, boolean>);

      return {
        ...allClosed,
        [name]: !prev[name],
      };
    });
  };

  // Handle hover for desktop dropdowns
  const handleMouseEnter = (name: string) => {
    setOpenDropdowns((prev) => {
      const allClosed = Object.keys(prev).reduce((acc, key) => {
        acc[key] = false;
        return acc;
      }, {} as Record<string, boolean>);

      return {
        ...allClosed,
        [name]: true,
      };
    });
  };

  // Close all dropdowns
  const closeAllDropdowns = () => {
    setOpenDropdowns({});
  };

  // Close all dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const isOutsideNav =
        navRef.current && !navRef.current.contains(event.target as Node);

      if (isOutsideNav) {
        closeAllDropdowns();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Style classes
  const activeClass = "text-blue-500 dark:text-blue-400 font-medium";
  const inactiveClass = "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white";
  const dropdownItemClass =
    "py-2 px-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors block w-full text-center";

  return (
    <header
      className={`${
        pathname.startsWith("/admin/") || pathname === "/admin" ? "hidden" : ""
      } border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 relative z-50 w-full transition-colors duration-200`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Website Logo */}
          <h1 className="text-xl font-bold text-gray-900 dark:text-white ml-[3%] transition-colors duration-200">Tradoxus</h1>

          {/* Mobile menu toggle button */}
          <button
            type="button"
            className="md:hidden text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>

          {/* Desktop navigation menu */}
          <div className="hidden md:flex items-center space-x-10 mr-[3%]">
            <nav
              ref={navRef}
              className="flex items-center space-x-10 text-sm"
            >
              {navigationStructure.map((item) => (
                <div
                  key={item.name}
                  className="relative pr-0 md:pr-2"
                  ref={(el) => {
                    if (item.dropdown) {
                      dropdownRefs.current[item.name] = el;
                    }
                  }}
                >
                  {item.dropdown ? (
                    <>
                      <button
                        className={`flex items-center gap-1 transition-colors ${
                          isActiveDropdown(item.items || [])
                            ? activeClass
                            : inactiveClass
                        }`}
                        onClick={() => toggleDropdown(item.name)}
                        onMouseEnter={() => handleMouseEnter(item.name)}
                        aria-expanded={openDropdowns[item.name]}
                        aria-haspopup="true"
                      >
                        {item.name}
                        <ChevronDown className="h-4 w-4" />
                      </button>

                      {/* Desktop dropdown menu */}
                      {openDropdowns[item.name] && (
                        <div
                          className="absolute px-2 mt-5 ml-[-20px] w-[120px] bg-gray-900 border border-gray-800 rounded-md shadow-lg py-2 animate-in fade-in-100 duration-500"
                          onMouseLeave={() => closeAllDropdowns()}
                        >
                          {item.items?.map((subItem) => (
                            <Link
                              key={subItem.path}
                              href={subItem.path}
                              className={`${dropdownItemClass} ${
                                isActivePath(subItem.path)
                                  ? activeClass
                                  : inactiveClass
                              }`}
                              onClick={() => closeAllDropdowns()}
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={item.path}
                      className={`transition-colors ${
                        isActivePath(item.path) ? activeClass : inactiveClass
                      }`}
                      onMouseEnter={() => closeAllDropdowns()}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            {/* Wallet Connection Button */}
            <div className="flex items-center">
              {walletAddress ? (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={disconnectWallet}
                    className="flex items-center space-x-2 bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 hover:scale-105 shadow-lg shadow-green-500/25"
                    disabled={isConnecting}
                  >
                    <Wallet className="w-4 h-4" />
                    <span className="hidden sm:inline">
                      {`${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`}
                    </span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={connectWallet}
                  disabled={isConnecting}
                  className="flex items-center space-x-2 bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 hover:scale-105 shadow-lg shadow-cyan-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Wallet className="w-4 h-4" />
                  <span className="hidden sm:inline">
                    {isConnecting ? "Connecting..." : "Connect Wallet"}
                  </span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Mobile navigation menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute left-0 right-0 top-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-lg animate-in slide-in-from-top-5 duration-300 w-full transition-colors duration-200">
            <nav className="flex flex-col py-4 px-4">
              {navigationStructure.map((item) => (
                <div key={item.name} className="py-1">
                  {item.dropdown ? (
                    <div className="w-full">
                      <button
                        className={`flex items-center justify-between w-full py-3 px-4 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
                          isActiveDropdown(item.items || [])
                            ? activeClass
                            : inactiveClass
                        }`}
                        onClick={() => toggleDropdown(item.name)}
                        aria-expanded={openDropdowns[item.name]}
                      >
                        {item.name}
                        <ChevronDown
                          className={`h-4 w-4 transition-transform ${
                            openDropdowns[item.name] ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {openDropdowns[item.name] && (
                        <div className="pl-4 mt-1 border-l border-gray-200 dark:border-gray-800 ml-4 space-y-1">
                          {item.items?.map((subItem) => (
                            <Link
                              key={subItem.path}
                              href={subItem.path}
                              className={`py-2 px-4 rounded-md block hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
                                isActivePath(subItem.path)
                                  ? activeClass
                                  : inactiveClass
                              }`}
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={item.path}
                      className={`py-3 px-4 rounded-md block hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
                        isActivePath(item.path) ? activeClass : inactiveClass
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
              {/* Mobile Wallet Connection */}
              <div className="py-1 mt-4 border-t border-gray-800 pt-4">
                {walletAddress ? (
                  <button
                    onClick={disconnectWallet}
                    disabled={isConnecting}
                    className="flex items-center justify-center space-x-2 w-full bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 px-4 py-3 rounded-lg font-medium text-sm transition-all duration-300 disabled:opacity-50"
                  >
                    <Wallet className="w-4 h-4" />
                    <span>
                      {`${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`}
                    </span>
                  </button>
                ) : (
                  <button
                    onClick={connectWallet}
                    disabled={isConnecting}
                    className="flex items-center justify-center space-x-2 w-full bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 px-4 py-3 rounded-lg font-medium text-sm transition-all duration-300 disabled:opacity-50"
                  >
                    <Wallet className="w-4 h-4" />
                    <span>{isConnecting ? "Connecting..." : "Connect Wallet"}</span>
                  </button>
                )}
                <div className="py-1">
                  <div className="py-3 px-4">
                    <ThemeToggle />
                  </div>
                </div>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}