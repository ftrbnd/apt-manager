'use client';

import { useBuildings } from '@/hooks/useBuildings';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { useManagers } from '@/hooks/useUsers';
import { Check, Users, X } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Manager, ManagerWithBuilding } from '@/lib/drizzle/schema';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuth } from '@/hooks/useAuth';

export function ManagersCard() {
	const { myBuilding, buildingLoading } = useBuildings();
	const { managers, managersLoading, accept, remove } = useManagers();

	const acceptedManagers = managers?.filter(
		(manager) =>
			manager?.managers_buildings.approved &&
			myBuilding?.id === manager.managers_buildings.buildingId
	);
	const pendingManagers = managers?.filter(
		(manager) =>
			!manager.managers_buildings.approved &&
			myBuilding?.id === manager.managers_buildings.buildingId
	);

	const handleAccept = async (manager: ManagerWithBuilding) => {
		const promise = () => accept(manager);

		toast.promise(promise, {
			loading: 'Waiting...',
			success: `Accepted ${manager.user.firstName} ${manager.user.lastName}`,
			error: `Failed to accept ${manager.user.firstName} ${manager.user.lastName}`,
		});
	};

	const handleReject = async (manager: ManagerWithBuilding) => {
		// TODO: remove manager-building pairing, not whole user
		const promise = () => remove(manager.user.id);

		toast.promise(promise, {
			loading: 'Waiting...',
			success: `Rejected ${manager.user.firstName} ${manager.user.lastName}`,
			error: `Failed to reject ${manager.user.firstName} ${manager.user.lastName}`,
		});
	};

	return (
		<Card>
			<CardHeader>
				<div className='flex flex-row items-center gap-4'>
					<CardTitle>Managers</CardTitle>
					<Users className='w-5 h-5' />
				</div>
				{buildingLoading || !myBuilding ? (
					<Skeleton className='w-24 h-5' />
				) : (
					<CardDescription>{myBuilding.street}</CardDescription>
				)}
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
						{managersLoading || !acceptedManagers
							? [1, 2, 3].map((v) => (
									<div
										key={v}
										className='flex flex-col gap-4 sm:flex-row'>
										<ManagerDetailsSkeleton />
									</div>
							  ))
							: acceptedManagers.map((manager) => (
									<div
										key={manager.user.id}
										className='flex flex-col gap-4 sm:flex-row'>
										<ManagerDetails manager={manager.user} />
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
						{managersLoading || !pendingManagers ? (
							[1, 2, 3].map((v) => (
								<div
									key={v}
									className='flex flex-col gap-4 sm:flex-row'>
									<ManagerDetailsSkeleton />
								</div>
							))
						) : pendingManagers.length > 0 ? (
							pendingManagers.map((manager) => (
								<div
									key={manager.user.id}
									className='flex flex-col gap-4 sm:flex-row'>
									<ManagerDetails manager={manager.user} />

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
	const { user } = useAuth();

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
					{manager.id === user?.id && (
						<span className='text-muted-foreground'> (me)</span>
					)}
				</p>
				<p className='text-sm text-muted-foreground'>
					Joined {new Date(manager.createdAt ?? '').toDateString()}
				</p>
			</div>
		</div>
	);
}

function ManagerDetailsSkeleton() {
	return (
		<div className='flex items-center gap-4'>
			<Skeleton className='rounded-full w-9 h-9' />

			<div className='grid gap-1'>
				<Skeleton className='w-24 h-5 ' />
				<Skeleton className='w-40 h-5 ' />
			</div>
		</div>
	);
}
