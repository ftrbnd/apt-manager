'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface Props {
	closeSheet?: () => void;
}

export function HeaderLinks({ closeSheet }: Props) {
	const pathname = usePathname();

	const textForeground = (path: string) =>
		pathname === path ? 'text-foreground' : 'text-muted-foreground';

	return (
		<>
			<Link
				href='/'
				onClick={closeSheet}
				className={`${textForeground(
					'/'
				)} transition-colors hover:text-foreground`}>
				Dashboard
			</Link>
			<Link
				href='/receipts'
				onClick={closeSheet}
				className={`${textForeground(
					'/receipts'
				)} transition-colors hover:text-foreground`}>
				Receipts
			</Link>
		</>
	);
}
