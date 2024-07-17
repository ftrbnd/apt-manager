import Link from 'next/link';
import { Menu, Package2 } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { UserMenu } from './UserMenu';
import { auth } from '@clerk/nextjs/server';
import { HeaderLinks } from './HeaderLinks';

export function Header() {
	const { userId } = auth();

	return (
		<header className='sticky top-0 flex h-16 justify-between items-center gap-4 border-b bg-background px-4 md:px-6'>
			<nav className='hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6'>
				<Link
					href='#'
					className='flex items-center gap-2 text-lg font-semibold md:text-base'>
					<Package2 className='h-6 w-6' />
					<span className='sr-only'>Rent Receipts</span>
				</Link>
				{userId ? (
					<HeaderLinks />
				) : (
					<p className='text-foreground transition-colors hover:text-foreground'>
						Rent Receipts
					</p>
				)}
			</nav>
			<Sheet>
				<SheetTrigger asChild>
					<Button
						variant='outline'
						size='icon'
						className='shrink-0 md:hidden'>
						<Menu className='h-5 w-5' />
						<span className='sr-only'>Toggle navigation menu</span>
					</Button>
				</SheetTrigger>
				<p className='text-foreground transition-colors hover:text-foreground md:hidden'>
					Rent Receipts
				</p>
				{userId && (
					<SheetContent side='left'>
						<nav className='grid gap-6 text-lg font-medium'>
							<Link
								href='#'
								className='flex items-center gap-2 text-lg font-semibold'>
								<Package2 className='h-6 w-6' />
								<span className='sr-only'>Rent Receipts</span>
							</Link>
							<HeaderLinks />
						</nav>
					</SheetContent>
				)}
			</Sheet>
			<UserMenu />
		</header>
	);
}
