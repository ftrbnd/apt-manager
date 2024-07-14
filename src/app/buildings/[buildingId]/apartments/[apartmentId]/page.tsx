'use client';

import { EditApartmentForm } from '@/components//Apartment/EditApartmentForm';
import { useState } from 'react';
import { ApartmentDetails } from '@/components/Apartment/ApartmentDetails';
import { useApartments } from '@/hooks/useApartments';
import { useBuildings } from '@/hooks/useBuildings';

interface Params {
	buildingId: string;
	apartmentId: string;
}

export default function Page({ params }: { params: Params }) {
	const { apartment, apartmentLoading } = useApartments(params.apartmentId);
	const { building } = useBuildings(parseInt(params.buildingId));

	const [isEditing, setIsEditing] = useState(false);

	return (
		<div className='flex w-full flex-col items-center bg-muted/40 p-2 md:p-16'>
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
