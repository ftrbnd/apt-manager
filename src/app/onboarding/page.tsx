'use client';

import { useUser } from '@clerk/nextjs';
import { BuildingSelect } from '@/components/BuildingSelect';
import { useState } from 'react';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { CircleCheck, Loader2, Undo } from 'lucide-react';
import { useManagers } from '@/hooks/useManagers';
import { useBuildings } from '@/hooks/useBuildings';
import { Skeleton } from '@/components/ui/skeleton';

export default function Page() {
	const { create, remove, managersLoading, me } = useManagers();
	const { building } = useBuildings(me?.buildingId);

	const { user } = useUser();

	const [buildingId, setBuildingId] = useState<string | null>(null);
	const [error, setError] = useState('');

	const handleSubmit = async () => {
		if (!user) return setError('Unauthorized');

		if (me) {
			const promise = () => remove(me?.id);

			toast.promise(promise, {
				loading: 'Removing...',
				success: `Removed your request`,
				error: 'Failed to remove your request',
			});

			setError('');
		} else {
			if (!buildingId) return setError('Please select a building.');

			const promise = () =>
				create({
					clerkUserId: user.id,
					buildingId: parseInt(buildingId),
					firstName: user.firstName,
					lastName: user.lastName,
					email: user.primaryEmailAddress?.emailAddress,
					avatar: user.imageUrl,
				});

			toast.promise(promise, {
				loading: 'Assigning...',
				success: `Sent your request`,
				error: 'Failed to send your request',
			});
		}

		setBuildingId(null);
	};

	return (
		<div className='flex flex-col items-center justify-center w-full min-h-screen p-4 bg-muted/40'>
			{managersLoading ? (
				<Card className='w-full sm:max-w-sm'>
					<CardHeader>
						<Skeleton className='ml-1 underline h-6 w-[200px]' />
						<Skeleton className='ml-1 underline h-4 w-[250px]' />
					</CardHeader>
					<CardContent>
						<Skeleton className='ml-1 h-6 w-full md:w-[300px]' />
					</CardContent>
					<CardFooter>
						<Button
							disabled
							variant='outline'>
							<Loader2 className='w-4 h-4 mr-2 animate-spin' />
							Loading...
						</Button>
					</CardFooter>
				</Card>
			) : (
				<Card className='w-full sm:max-w-sm'>
					<CardHeader>
						<CardTitle>{me ? 'Your request was sent' : 'Welcome!'}</CardTitle>
						<CardDescription>
							{me
								? 'Awaiting approval from another manager'
								: "Let's get started"}
						</CardDescription>
					</CardHeader>
					<CardContent>
						{me ? (
							<p>
								{building
									? `${building.street} (${building.city}, ${building.state})`
									: ''}
							</p>
						) : (
							<>
								<BuildingSelect setBuildingId={setBuildingId} />
								{error && <p className='text-red-700'>{error}</p>}
							</>
						)}
					</CardContent>
					<CardFooter>
						<Button
							onClick={handleSubmit}
							variant={me ? 'destructive' : 'default'}>
							{me ? (
								<Undo className='w-4 h-4 mr-2' />
							) : (
								<CircleCheck className='w-4 h-4 mr-2' />
							)}
							{me ? 'Undo' : 'Submit'}
						</Button>
					</CardFooter>
				</Card>
			)}
		</div>
	);
}
