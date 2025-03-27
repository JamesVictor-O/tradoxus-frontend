"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
	{ name: "Modules", path: "/modules" },
	{ name: "Problem", path: "/problem" },
	{ name: "Solution", path: "/solution" },
	{ name: "Benefits", path: "/benefits" },
	{ name: "Gamification", path: "/gamification" },
	{ name: "Web3", path: "/web3" },
	{ name: "Dashboard", path: "/dashboard" },
	{ name: "Profile", path: "/tradingdemo" },
];

const activeClass = "text-blue-400 hover:text-blue-300";
const inactiveClass = "text-gray-400 hover:text-white transition-colors";

export function Header() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const pathname = usePathname();

	return (
		<header className="border-b border-gray-800 relative z-50">
			<div className="container mx-auto px-4 py-4">
				<div className="flex items-center justify-between">
					{/* Website Logo */}
					<h1 className="text-xl font-bold text-white">Tradoxus</h1>

					{/* Mobile menu toggle button */}
					<button
						type="button"
						className="md:hidden text-gray-400 hover:text-white transition-colors"
						onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
					>
						{mobileMenuOpen ? (
							<X className="h-6 w-6" />
						) : (
							<Menu className="h-6 w-6" />
						)}
					</button>

					{/* Desktop navigation menu */}
					<nav className="hidden md:flex space-x-6 text-sm">
						{navLinks.map(({ path, name }) => (
							<Link
								key={path}
								href={path}
								className={`${pathname === path ? activeClass : inactiveClass}`}
							>
								{name}
							</Link>
						))}
					</nav>
				</div>

				{/* Mobile navigation menu */}
				{mobileMenuOpen && (
					<div className="md:hidden absolute left-0 right-0 top-full bg-gray-900 border-b border-gray-800 shadow-lg animate-in slide-in-from-top-5 duration-300">
						<nav className="flex flex-col py-4 px-4">
							{navLinks.map(({ path, name }) => (
								<Link
									key={path}
									href={path}
									className={`${pathname === path ? activeClass : inactiveClass} py-3 px-4 rounded-md hover:bg-gray-800`}
									onClick={() => setMobileMenuOpen(false)}
								>
									{name}
								</Link>
							))}
						</nav>
					</div>
				)}
			</div>
		</header>
	);
}
