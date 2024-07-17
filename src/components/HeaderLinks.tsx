'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function HeaderLinks() {
	const pathname = usePathname();

	const textForeground = (path: string) =>
		pathname === path ? 'text-foreground' : 'text-muted-foreground';

	return (
		<>
			<Link
				href='/'
				className={`${textForeground(
					'/'
				)} transition-colors hover:text-foreground`}>
				Dashboard
			</Link>
			<Link
				href='/receipts'
				className={`${textForeground(
					'/receipts'
				)} transition-colors hover:text-foreground`}>
				Receipts
			</Link>
		</>
	);
}
