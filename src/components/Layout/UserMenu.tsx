'use client';

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useAuth, useUser } from '@clerk/nextjs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CircleUser } from 'lucide-react';

export function UserMenu() {
	const { signOut } = useAuth();
	const { user } = useUser();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant='secondary'
					size='icon'
					className='rounded-full'>
					{user ? (
						<Avatar>
							<AvatarImage src={user.imageUrl} />
							<AvatarFallback>
								{user.firstName ? user.firstName[0] : ''}
								{user.lastName ? user.lastName[0] : ''}
							</AvatarFallback>
						</Avatar>
					) : (
						<CircleUser className='w-5 h-5' />
					)}

					<span className='sr-only'>Toggle user menu</span>
				</Button>
			</DropdownMenuTrigger>
			{user && (
				<DropdownMenuContent align='end'>
					<DropdownMenuLabel>My Account</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuItem asChild>
						<Link href='/account'>Settings</Link>
					</DropdownMenuItem>
					<DropdownMenuItem onClick={() => signOut()}>
						Sign out
					</DropdownMenuItem>
				</DropdownMenuContent>
			)}
		</DropdownMenu>
	);
}
