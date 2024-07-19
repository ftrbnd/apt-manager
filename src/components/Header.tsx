import Link from 'next/link';
import { Receipt } from 'lucide-react';

import { UserMenu } from './UserMenu';
import { auth } from '@clerk/nextjs/server';
import { HeaderLinks } from './HeaderLinks';
import { ThemeToggle } from './ThemeToggle';
import { NavSheet } from './NavSheet';

export function Header() {
	const { userId } = auth();

	return (
		<header className='sticky top-0 flex items-center justify-between h-16 gap-4 px-4 border-b bg-background md:px-6'>
			<nav className='flex-col hidden gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6'>
				<Link
					href='/'
					className='flex items-center gap-2 text-lg font-semibold md:text-base'>
					<Receipt className='w-6 h-6' />
					<span className='sr-only'>Rent Receipts</span>
				</Link>
				{userId ? (
					<HeaderLinks />
				) : (
					<Link
						href='/'
						className='transition-colors text-foreground hover:text-foreground'>
						Rent Receipts
					</Link>
				)}
			</nav>

			<NavSheet />

			<div className='flex items-center justify-between gap-2'>
				<ThemeToggle />
				<UserMenu />
			</div>
		</header>
	);
}
