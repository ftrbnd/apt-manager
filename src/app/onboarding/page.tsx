'use client';

import { useUser } from '@clerk/nextjs';
import { sendManagerRequest } from '@/actions';
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
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { CircleCheck } from 'lucide-react';

export default function OnboardingComponent() {
	const [buildingId, setBuildingId] = useState<string | null>(null);
	const [error, setError] = useState('');

	const { user } = useUser();

	const handleSubmit = async () => {
		if (!buildingId) return setError('Please select a building.');
		if (!user) return setError('Invalid user.');

		const promise = () => sendManagerRequest(user.id, parseInt(buildingId));

		toast.promise(promise, {
			loading: 'Assigning...',
			success: () => `Sent your request`,
			error: 'Failed to send your request',
		});
	};

	return (
		<div className='flex flex-col items-center justify-center w-full min-h-screen bg-muted/40'>
			<Card className={cn('w-[380px]')}>
				<CardHeader>
					<CardTitle>Welcome!</CardTitle>
					<CardDescription>Let's get started.</CardDescription>
				</CardHeader>
				<CardContent>
					<BuildingSelect setBuildingId={setBuildingId} />
					{error && <p className='text-red-700'>{error}</p>}
				</CardContent>
				<CardFooter>
					<Button onClick={handleSubmit}>
						<CircleCheck className='w-4 h-4 mr-2' />
						Submit
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
}
