import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Loader2, Undo, CircleCheck, HousePlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { BuildingSelect } from './BuildingSelect';
import { useBuildings } from '@/hooks/useBuildings';
import { useState } from 'react';
import { toast } from 'sonner';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/useAuth';
import { generateId } from 'lucia';
import { useUserBuildings } from '@/hooks/useUserBuildings';

interface Props {
	close: () => void;
}

export function BuildingCard({ close }: Props) {
	const { create, remove, myUserBuilding, userBuildingsLoading } =
		useUserBuildings();
	const { myBuilding } = useBuildings();

	const { user } = useAuth();

	const [buildingId, setBuildingId] = useState<string | null>(null);
	const [error, setError] = useState('');

	const handleSubmit = async () => {
		if (!user) return setError('Unauthorized');

		if (myUserBuilding) {
			const promise = () => remove(myUserBuilding);

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
					id: generateId(15),
					approved: false,
					buildingId: buildingId,
					userId: user.id,
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
		<>
			{userBuildingsLoading ? (
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
						<CardTitle>
							{myUserBuilding ? 'Your request was sent' : 'Welcome!'}
						</CardTitle>
						<CardDescription>
							{myUserBuilding
								? 'Awaiting approval from another manager'
								: "Let's get started"}
						</CardDescription>
					</CardHeader>
					<CardContent>
						{myUserBuilding ? (
							myBuilding ? (
								<p>{`${myBuilding.street} (${myBuilding.city}, ${myBuilding.state})`}</p>
							) : (
								<Skeleton className='ml-1 h-6 w-full md:w-[300px]' />
							)
						) : (
							<>
								<Label>Select your building to manage</Label>
								<BuildingSelect setBuildingId={setBuildingId} />
								{error && <p className='text-red-700'>{error}</p>}
							</>
						)}
					</CardContent>
					<CardFooter className='grid grid-cols-3 gap-2'>
						<Button
							onClick={handleSubmit}
							variant={myUserBuilding ? 'destructive' : 'default'}>
							{myUserBuilding ? (
								<Undo className='w-4 h-4 mr-2' />
							) : (
								<CircleCheck className='w-4 h-4 mr-2' />
							)}
							{myUserBuilding ? 'Undo' : 'Submit'}
						</Button>
						<div className='flex items-center justify-center gap-2'>
							<Separator className='w-4' />
							<p className='text-sm text-muted-foreground'>OR</p>
							<Separator className='w-4' />
						</div>
						<Button
							variant='ghost'
							onClick={close}>
							<HousePlus className='w-4 h-4 mr-2' />
							Create
						</Button>
					</CardFooter>
				</Card>
			)}
		</>
	);
}
