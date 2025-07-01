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
  const [openDropdowns, setOpenDropdowns] = useState<Record<string, boolean>>(
    {}
  );
  const [isMobile, setIsMobile] = useState(false);
  const { walletAddress, isConnecting, connectWallet, disconnectWallet } =
    useWallet();
  const pathname = usePathname();
  const dropdownRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const navRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

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

  // Toggle dropdown (mobile-optimized)
  const toggleDropdown = (name: string, event?: React.MouseEvent) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    setOpenDropdowns((prev) => {
      if (isMobile) {
        // On mobile, allow multiple dropdowns to be open
        return {
          ...prev,
          [name]: !prev[name],
        };
      } else {
        // On desktop, close all others when opening one
        const allClosed = Object.keys(prev).reduce((acc, key) => {
          acc[key] = false;
          return acc;
        }, {} as Record<string, boolean>);

        return {
          ...allClosed,
          [name]: !prev[name],
        };
      }
    });
  };

  // Handle hover for desktop dropdowns
  const handleMouseEnter = (name: string) => {
    if (isMobile) return; // Disable hover on mobile

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

  // Handle mouse leave for desktop
  const handleMouseLeave = () => {
    if (isMobile) return;

    setTimeout(() => {
      setOpenDropdowns({});
    }, 150); // Small delay to prevent flickering
  };

  // Close all dropdowns
  const closeAllDropdowns = () => {
    setOpenDropdowns({});
  };

  // Close mobile menu
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    closeAllDropdowns();
  };

  // Handle wallet connection with improved mobile UX
  const handleWalletAction = async (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();

    try {
      if (walletAddress) {
        await disconnectWallet();
      } else {
        await connectWallet();
      }
    } catch (error) {
      console.error("Wallet action failed:", error);
    }
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | Event) => {
      const target = event.target as Node;
      const isOutsideNav = navRef.current && !navRef.current.contains(target);
      const isOutsideMobileMenu =
        mobileMenuRef.current && !mobileMenuRef.current.contains(target);

      if (isOutsideNav && (isMobile ? isOutsideMobileMenu : true)) {
        closeAllDropdowns();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isMobile, closeAllDropdowns]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMobileMenu();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [closeMobileMenu]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Style classes
  const activeClass = "text-blue-500 dark:text-blue-400 font-medium";
  const inactiveClass =
    "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white";
  const dropdownItemClass =
    "py-2 px-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors block w-full text-left";

  return (
    <header
      className={`${
        pathname.startsWith("/admin/") || pathname === "/admin" ? "hidden" : ""
      } border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 sticky top-0 z-50 w-full transition-colors duration-200`}
    >
      <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Website Logo - Responsive */}
          <div className="flex-shrink-0">
            <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-200">
              Tradoxus
            </h1>
          </div>

          {/* Mobile menu toggle button - Enhanced for touch */}
          <button
            type="button"
            className="md:hidden p-2 -mr-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-all duration-200 touch-manipulation"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>

          {/* Desktop navigation menu - Improved responsive breakpoints */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-8 xl:space-x-10">
            <nav
              ref={navRef}
              className="flex items-center space-x-4 lg:space-x-6 xl:space-x-8 text-sm lg:text-base"
            >
              {navigationStructure.map((item) => (
                <div
                  key={item.name}
                  className="relative"
                  ref={(el) => {
                    if (item.dropdown) {
                      dropdownRefs.current[item.name] = el;
                    }
                  }}
                >
                  {item.dropdown ? (
                    <div
                      onMouseEnter={() => handleMouseEnter(item.name)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <button
                        className={`flex items-center gap-1 py-2 px-1 transition-colors ${
                          isActiveDropdown(item.items || [])
                            ? activeClass
                            : inactiveClass
                        }`}
                        onClick={(e) => toggleDropdown(item.name, e)}
                        aria-expanded={openDropdowns[item.name]}
                        aria-haspopup="true"
                      >
                        <span className="whitespace-nowrap">{item.name}</span>
                        <ChevronDown className="h-4 w-4 transition-transform duration-200" />
                      </button>

                      {/* Desktop dropdown menu - Improved positioning */}
                      {openDropdowns[item.name] && (
                        <div
                          className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-32 lg:w-36 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg shadow-lg py-2 animate-in fade-in-0 zoom-in-95 duration-200"
                          onMouseEnter={() => handleMouseEnter(item.name)}
                          onMouseLeave={handleMouseLeave}
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
                              <span className="whitespace-nowrap">
                                {subItem.name}
                              </span>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={item.path}
                      className={`py-2 px-1 transition-colors whitespace-nowrap ${
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

            {/* Desktop Wallet Connection Button - Responsive sizing */}
            <div className="flex items-center ml-4 lg:ml-6">
              {walletAddress ? (
                <button
                 type="button"
                  onClick={handleWalletAction}
                  className="flex items-center space-x-1 lg:space-x-2 bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 px-3 lg:px-4 py-2 rounded-lg font-medium text-xs lg:text-sm transition-all duration-300 hover:scale-105 shadow-lg shadow-green-500/25 disabled:opacity-50"
                  disabled={isConnecting}
                >
                  <Wallet className="w-4 h-4 flex-shrink-0" />
                  <span className="hidden sm:inline truncate max-w-24">
                    {`${walletAddress.slice(0, 6)}...${walletAddress.slice(
                      -4
                    )}`}
                  </span>
                </button>
              ) : (
                <button
                   type="button"
                  onClick={handleWalletAction}
                  disabled={isConnecting}
                  className="flex items-center space-x-1 lg:space-x-2 bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 px-3 lg:px-4 py-2 rounded-lg font-medium text-xs lg:text-sm transition-all duration-300 hover:scale-105 shadow-lg shadow-cyan-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  <Wallet className="w-4 h-4 flex-shrink-0" />
                  <span className="hidden sm:inline whitespace-nowrap">
                    {isConnecting ? "Connecting..." : "Connect Wallet"}
                  </span>
                </button>
              )}
            </div>

            {/* Desktop Theme Toggle */}
            <div className="hidden lg:flex">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile navigation menu - Fixed positioning */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={closeMobileMenu}
            onKeyDown={(e) => e.key === "Escape" && closeMobileMenu()}
            role="button"
            tabIndex={0}
            aria-label="Close mobile menu"
          />

          {/* Mobile Menu - Changed positioning */}
          <div
            ref={mobileMenuRef}
            className="md:hidden absolute left-0 right-0 top-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-xl z-50 max-h-[calc(100vh-100px)] overflow-y-auto transition-colors duration-200"
          >
            <nav className="flex flex-col py-4 px-4 space-y-1">
              {navigationStructure.map((item) => (
                <div key={item.name} className="w-full">
                  {item.dropdown ? (
                    <div className="w-full">
                      <button
                       type="button"
                        className={`flex items-center justify-between w-full py-3 px-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 touch-manipulation ${
                          isActiveDropdown(item.items || [])
                            ? activeClass
                            : inactiveClass
                        }`}
                        onClick={(e) => toggleDropdown(item.name, e)}
                        aria-expanded={openDropdowns[item.name]}
                      >
                        <span className="font-medium">{item.name}</span>
                        <ChevronDown
                          className={`h-5 w-5 transition-transform duration-200 ${
                            openDropdowns[item.name] ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {/* Mobile Dropdown Items */}
                      {openDropdowns[item.name] && (
                        <div className="pl-4 mt-2 mb-2 border-l-2 border-blue-500/30 ml-4 space-y-1">
                          {item.items?.map((subItem) => (
                            <Link
                              key={subItem.path}
                              href={subItem.path}
                              className={`py-2.5 px-4 rounded-lg block hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 touch-manipulation ${
                                isActivePath(subItem.path)
                                  ? activeClass
                                  : inactiveClass
                              }`}
                              onClick={closeMobileMenu}
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
                      className={`py-3 px-4 rounded-lg block hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 touch-manipulation font-medium ${
                        isActivePath(item.path) ? activeClass : inactiveClass
                      }`}
                      onClick={closeMobileMenu}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}

              {/* Mobile Wallet Connection - Enhanced */}
              <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-800 space-y-3">
                {walletAddress ? (
                  <button
                   type="button"
                    onClick={handleWalletAction}
                    disabled={isConnecting}
                    className="flex items-center justify-center space-x-3 w-full bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 active:scale-95 px-4 py-3.5 rounded-lg font-medium text-sm transition-all duration-200 disabled:opacity-50 touch-manipulation shadow-lg text-white"
                  >
                    <Wallet className="w-5 h-5" />
                    <span>
                      {`${walletAddress.slice(0, 6)}...${walletAddress.slice(
                        -4
                      )}`}
                    </span>
                  </button>
                ) : (
                  <button
                    onClick={handleWalletAction}
                    disabled={isConnecting}
                    className="flex items-center justify-center space-x-3 w-full bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 active:scale-95 px-4 py-3.5 rounded-lg font-medium text-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation shadow-lg text-white"
                  >
                    <Wallet className="w-5 h-5" />
                    <span>
                      {isConnecting ? "Connecting..." : "Connect Wallet"}
                    </span>
                  </button>
                )}

                {/* Mobile Theme Toggle */}
                <div className="flex justify-center">
                  <ThemeToggle />
                </div>
              </div>
            </nav>
          </div>
        </>
      )}
    </header>
  );
}
