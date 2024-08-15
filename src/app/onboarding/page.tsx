'use client';

import { ProfileForm } from '@/components/Authentication/ProfileForm';
import { BuildingCard } from '@/components/Onboarding/BuildingCard';
import { CreateBuildingCard } from '@/components/Onboarding/CreateBuildingCard';
import { useAuth } from '@/hooks/useAuth';
import { useState } from 'react';

export default function Page() {
	const [showForm, setShowForm] = useState(false);

	const { user } = useAuth();
	console.log(user);

	const userFilledOutForm =
		user?.firstName !== null && user?.lastName !== null && user?.email !== null;

	return (
		<div className='flex flex-col justify-center items-center flex-1 gap-4 p-4 md:gap-8 md:p-8 bg-muted/40 min-h-screen'>
			{userFilledOutForm ? (
				showForm ? (
					<CreateBuildingCard close={() => setShowForm(false)} />
				) : (
					<BuildingCard close={() => setShowForm(true)} />
				)
			) : (
				<div className='flex flex-col gap-4'>
					<h3 className='mt-8 scroll-m-20 text-2xl font-semibold tracking-tight'>
						Welcome! Please fill out the form to continue.
					</h3>
					<ProfileForm showHeader={false} />
				</div>
			)}
		</div>
	);
}
