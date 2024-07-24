'use client';

import { useBuildings } from '@/hooks/useBuildings';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from './ui/card';
import { useManagers } from '@/hooks/useManagers';
import { Users } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';

export function ManagersCard() {
	const { myBuilding } = useBuildings();
	const { managers } = useManagers();

	const acceptedManagers = managers?.filter((manager) => manager.approved);
	const pendingManagers = managers?.filter((manager) => !manager.approved);

	return (
		<Card x-chunk='dashboard-01-chunk-5'>
			<CardHeader>
				<div className='flex flex-row items-center gap-4'>
					<CardTitle>Managers</CardTitle>
					<Users className='w-5 h-5' />
				</div>
				<CardDescription>{myBuilding?.street}</CardDescription>
			</CardHeader>
			<CardContent className='grid gap-8'>
				<div className='p-4 border rounded-md'>
					<h4 className='mb-4 text-xl font-semibold tracking-tight scroll-m-20'>
						Current
					</h4>
					{acceptedManagers?.map((manager) => (
						<div
							key={manager.id}
							className='flex items-center gap-4'>
							<Avatar className='hidden h-9 w-9 sm:flex'>
								{manager.avatar ? (
									<AvatarImage
										src={manager.avatar}
										alt='Avatar'
									/>
								) : (
									<AvatarFallback>
										{manager.firstName ? manager.firstName[0] : ''}
										{manager.lastName ? manager.lastName[0] : ''}
									</AvatarFallback>
								)}
							</Avatar>
							<div className='grid gap-1'>
								<p className='text-sm font-medium leading-none'>
									{manager.firstName} {manager.lastName}
								</p>
								<p className='text-sm text-muted-foreground'>
									Joined {new Date(manager.createdAt ?? '').toDateString()}
								</p>
							</div>
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	);
}
