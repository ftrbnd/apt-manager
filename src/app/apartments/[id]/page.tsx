'use client';

import { EditApartmentForm } from '@/components//Apartment/EditApartmentForm';
import { useState } from 'react';
import { ApartmentDetails } from '@/components/Apartment/ApartmentDetails';
import { useApartments } from '@/hooks/useApartments';
import { useBuildings } from '@/hooks/useBuildings';
import { Receipt } from '@/components/Receipt';

interface Params {
	id: string;
}

export default function Page({ params }: { params: Params }) {
	const { apartment, apartmentLoading } = useApartments(params.id);
	const { building } = useBuildings(apartment?.buildingId);

	const [isEditing, setIsEditing] = useState(false);

	return (
		<div className='w-full flex flex-col gap-4 items-center bg-muted/40 p-2 md:p-16'>
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
			{apartment && <Receipt apartment={apartment} />}
		</div>
	);
}
