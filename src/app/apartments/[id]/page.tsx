'use client';

import { EditApartmentForm } from '@/components//Apartment/EditApartmentForm';
import { useState } from 'react';
import { ApartmentDetails } from '@/components/Apartment/ApartmentDetails';
import { useApartments } from '@/hooks/useApartments';
import { useBuildings } from '@/hooks/useBuildings';

interface Params {
	id: string;
}

export default function Page({ params }: { params: Params }) {
	const { apartment, apartmentLoading } = useApartments(params.id);
	const { building } = useBuildings(apartment?.buildingId);

	const [isEditing, setIsEditing] = useState(false);

	return (
		<div className='min-h-screen bg-muted/40 w-full flex flex-col gap-4 items-center p-4 md:p-16 '>
			{isEditing && apartment ? (
				<EditApartmentForm
					apartment={apartment}
					close={() => setIsEditing(false)}
				/>
			) : (
				<ApartmentDetails
					apartment={apartment}
					street={building?.street}
					edit={() => setIsEditing(true)}
					isLoading={apartmentLoading}
				/>
			)}
		</div>
	);
}
