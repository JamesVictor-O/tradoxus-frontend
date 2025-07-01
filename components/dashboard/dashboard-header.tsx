import { Button } from '@/components/ui/button'
import { LogOut, User } from 'lucide-react';
import Link from 'next/link';

export function DashboardHeader() {
	return (
		<div className="mb-4 sm:mb-6">
			<div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sm:gap-0 mb-6 sm:mb-8">
				<h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
					Welcome back, Trader
				</h1>
				<div className="flex items-center gap-2 sm:gap-4">
					<Button variant="outline" size="sm" asChild className="flex-1 sm:flex-none">
						<Link href="/profile">
							<User className="h-4 w-4 sm:mr-2" />
							<span className="hidden xs:inline ml-2 sm:ml-0">Profile</span>
						</Link>
					</Button>
					<Button variant="outline" size="sm" className="flex-1 sm:flex-none">
						<LogOut className="h-4 w-4 sm:mr-2" />
						<span className="hidden xs:inline ml-2 sm:ml-0">Logout</span>
					</Button>
				</div>
			</div>

			<p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
				Continue your trading journey where you left off.
			</p>
		</div>
	);
}