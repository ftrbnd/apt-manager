'use client';

import { BuildingCard } from '@/components/Onboarding/BuildingCard';
import { CreateBuildingCard } from '@/components/Onboarding/CreateBuildingCard';
import { useState } from 'react';

export default function Page() {
	const [showForm, setShowForm] = useState(false);

	return (
		<div className='flex flex-col items-center justify-start w-full min-h-screen gap-4 p-4 md:justify-center md:flex-row bg-muted/40'>
			{showForm ? (
				<CreateBuildingCard close={() => setShowForm(false)} />
			) : (
				<BuildingCard close={() => setShowForm(true)} />
			)}
		</div>
	);
}
