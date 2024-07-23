'use client';

import { Menu, Receipt } from 'lucide-react';
import { HeaderLinks } from './HeaderLinks';
import { ThemeToggle } from './ThemeToggle';
import { Button } from './ui/button';
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from './ui/sheet';
import { useAuth } from '@clerk/nextjs';
import { useState } from 'react';
import Link from 'next/link';

export function NavSheet() {
	const { userId } = useAuth();
	const [open, setOpen] = useState(false);

	return (
		<Sheet
			open={open}
			onOpenChange={setOpen}>
			<SheetTrigger asChild>
				<Button
					variant='outline'
					size='icon'
					className='shrink-0 md:hidden'>
					<Menu className='w-5 h-5' />
					<span className='sr-only'>Toggle navigation menu</span>
				</Button>
			</SheetTrigger>
			<Link
				href='/'
				className='flex items-center gap-2 text-lg font-semibold md:hidden'>
				<Receipt className='w-6 h-6' />
				Rent Receipts
			</Link>
			<SheetContent side='left'>
				<SheetHeader>
					<SheetTitle>Rent Receipts</SheetTitle>
					<SheetDescription>Menu</SheetDescription>
				</SheetHeader>

				{userId && (
					<nav className='grid gap-6 text-lg font-medium'>
						<Link
							href='/'
							className='flex items-center gap-2 text-lg font-semibold'>
							<span className='sr-only'>Rent Receipts</span>
						</Link>
						<HeaderLinks closeSheet={() => setOpen(false)} />
						<ThemeToggle onSheet />
					</nav>
				)}
			</SheetContent>
		</Sheet>
	);
}