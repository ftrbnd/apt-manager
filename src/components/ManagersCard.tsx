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
import { Check, Users, X } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { Button } from './ui/button';
import { Manager } from '@/lib/drizzle/schema';
import { toast } from 'sonner';
import { Badge } from './ui/badge';

export function ManagersCard() {
	const { myBuilding } = useBuildings();
	const { managers, accept, remove } = useManagers();

	const acceptedManagers = managers?.filter((manager) => manager.approved);
	const pendingManagers = managers?.filter((manager) => !manager.approved);

	const handleAccept = async (manager: Manager) => {
		const promise = () => accept(manager);

		toast.promise(promise, {
			loading: 'Waiting...',
			success: `Accepted ${manager.firstName} ${manager.lastName}`,
			error: `Failed to accept ${manager.firstName} ${manager.lastName}`,
		});
	};

	const handleReject = async (manager: Manager) => {
		const promise = () => remove(manager.id);

		toast.promise(promise, {
			loading: 'Waiting...',
			success: `Rejected ${manager.firstName} ${manager.lastName}`,
			error: `Failed to reject ${manager.firstName} ${manager.lastName}`,
		});
	};

	return (
		<Card>
			<CardHeader>
				<div className='flex flex-row items-center gap-4'>
					<CardTitle>Managers</CardTitle>
					<Users className='w-5 h-5' />
				</div>
				<CardDescription>{myBuilding?.street}</CardDescription>
			</CardHeader>
			<CardContent className='grid gap-8'>
				<div className='p-4 border rounded-md'>
					<div className='flex items-center gap-2 mb-4'>
						<h4 className='text-xl font-semibold tracking-tight scroll-m-20'>
							Current
						</h4>
						<Badge variant='secondary'>{acceptedManagers?.length ?? 0}</Badge>
					</div>

					<div className='flex flex-col gap-4'>
						{acceptedManagers?.map((manager) => (
							<div
								key={manager.id}
								className='flex flex-col gap-4 sm:flex-row'>
								<ManagerDetails manager={manager} />
							</div>
						))}
					</div>
				</div>

				<div className='p-4 border rounded-md'>
					<div className='flex items-center gap-2 mb-4'>
						<h4 className='text-xl font-semibold tracking-tight scroll-m-20'>
							Pending
						</h4>
						<Badge
							variant={
								(pendingManagers?.length ?? 0) > 0 ? 'default' : 'secondary'
							}>
							{pendingManagers?.length ?? 0}
						</Badge>
					</div>

					<div className='flex flex-col gap-4'>
						{(pendingManagers?.length ?? 0) > 0 ? (
							pendingManagers?.map((manager) => (
								<div
									key={manager.id}
									className='flex flex-col gap-4 sm:flex-row'>
									<ManagerDetails manager={manager} />

									<div className='flex justify-center gap-4'>
										<Button
											className='flex-1'
											variant='destructive'
											onClick={() => handleReject(manager)}>
											<X className='w-4 h-4' />
											<span className='ml-2 sm:hidden'>Reject</span>
										</Button>
										<Button
											className='flex-1'
											onClick={() => handleAccept(manager)}>
											<Check className='w-4 h-4' />
											<span className='ml-2 sm:hidden'>Accept</span>
										</Button>
									</div>
								</div>
							))
						) : (
							<p className='text-sm text-muted-foreground'>No new requests.</p>
						)}
					</div>
				</div>
			</CardContent>
		</Card>
	);
}

function ManagerDetails({ manager }: { manager: Manager }) {
	return (
		<div className='flex items-center gap-4'>
			<Avatar className='flex h-9 w-9'>
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
	);
}
