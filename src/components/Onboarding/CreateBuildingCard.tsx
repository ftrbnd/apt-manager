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

interface Props {
	close: () => void;
}

export function CreateBuildingCard({ close }: Props) {
	function handleSubmit(values: NewBuilding) {
		console.log(values);
	}

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
