import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PencilOff, Save } from 'lucide-react';
import { CreateBuildingForm } from './CreateBuildingForm';
import { NewBuilding } from '@/lib/drizzle/schema';
import { useBuildings } from '@/hooks/useBuildings';
import { toast } from 'sonner';
import { useManagers } from '@/hooks/useManagers';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

interface Props {
	close: () => void;
}

export function CreateBuildingCard({ close }: Props) {
	const { create: createBuilding } = useBuildings();
	const { create: createManager } = useManagers();

	const { user } = useUser();
	const router = useRouter();

	const createBuildingAndAssignManager = async (building: NewBuilding) => {
		if (!user) throw new Error('Unauthorized');

		const newBuilding = await createBuilding(building);

		await createManager({
			clerkUserId: user.id,
			buildingId: newBuilding.id,
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.primaryEmailAddress?.emailAddress,
			avatar: user.imageUrl,
			approved: true,
		});

		router.push('/');
	};

	const handleSubmit = async (newBuilding: NewBuilding) => {
		const promise = () => createBuildingAndAssignManager(newBuilding);

		toast.promise(promise, {
			loading: 'Creating...',
			success: `Created ${newBuilding.street} (${newBuilding.city}, ${newBuilding.state})`,
			error: `Failed to create new building`,
		});
	};

	return (
		<Card className='w-full sm:max-w-sm'>
			<CardHeader>
				<CardTitle>New building</CardTitle>
				<CardDescription>
					You will become the manager of this building
				</CardDescription>
			</CardHeader>
			<CardContent>
				<CreateBuildingForm onSubmit={handleSubmit} />
			</CardContent>
			<CardFooter className='justify-between'>
				<Button
					variant='secondary'
					onClick={close}>
					<PencilOff className='w-4 h-4 mr-2' />
					Cancel
				</Button>
				<Button
					type='submit'
					form='building-form'>
					<Save className='w-4 h-4 mr-2' />
					Save
				</Button>
			</CardFooter>
		</Card>
	);
}
