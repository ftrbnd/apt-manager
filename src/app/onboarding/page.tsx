'use client';

import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { completeOnboarding } from '@/actions';
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

export default function OnboardingComponent() {
	// TODO: redirect user if they are already onboarded

	const [buildingId, setBuildingId] = useState<string | null>(null);
	const [error, setError] = useState('');

	const { user } = useUser();
	const router = useRouter();

	const handleSubmit = async () => {
		if (!buildingId) return setError('Please select a building.');

		const res = await completeOnboarding(parseInt(buildingId));
		if (res?.message) {
			// Reloads the user's data from Clerk's API
			await user?.reload();
			router.push('/');
		}
		if (res?.error) {
			setError(res?.error);
		}
	};

	return (
		<div className='flex min-h-screen w-full flex-col items-center justify-center bg-muted/40'>
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
					<Button onClick={handleSubmit}>Submit</Button>
				</CardFooter>
			</Card>
		</div>
	);
}
