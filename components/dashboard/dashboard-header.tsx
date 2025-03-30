import { Button } from '@/components/ui/button'
import { LogOut, User } from 'lucide-react';
import Link from 'next/link';


export function DashboardHeader() {
	return (
		<div className="mb-6">
			<div className="flex justify-between items-center mb-8">
				<h1 className="text-3xl font-bold tracking-tight">
					Welcome back, Trader
				</h1>
				<div className="flex items-center gap-4">
					<Button variant="outline" size="sm" asChild>
						<Link href="/profile">
							<User className="h-4 w-4 mr-2" />
							Profile
						</Link>
					</Button>
					<Button variant="outline" size="sm">
						<LogOut className="h-4 w-4 mr-2" />
						Logout
					</Button>
				</div>
			</div>

			<p className="text-gray-400">
				Continue your trading journey where you left off.
			</p>
		</div>
	);
}