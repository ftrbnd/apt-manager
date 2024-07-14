'use client';

import { useQuery } from '@tanstack/react-query';
import { getApartmentById } from '@/services/apartments';
import { EditApartmentForm } from '@/components//Apartment/EditApartmentForm';
import { useState } from 'react';
import { ApartmentDetails } from '@/components/Apartment/ApartmentDetails';
import { getBuildingById } from '@/services/buildings';

interface Params {
	buildingId: string;
	apartmentId: string;
}

export default function Page({ params }: { params: Params }) {
	const [isEditing, setIsEditing] = useState(false);

	const { data: apartment } = useQuery({
		queryKey: ['apartments', params.apartmentId],
		queryFn: () => getApartmentById(params.apartmentId),
	});

	const { data: building } = useQuery({
		queryKey: ['buildings', params.buildingId],
		queryFn: () => getBuildingById(parseInt(params.buildingId)),
	});

	return (
		<div className='flex w-full flex-col items-center bg-muted/40 p-2 md:p-16'>
			{apartment ? (
				isEditing ? (
					<EditApartmentForm
						apartment={apartment}
						close={() => setIsEditing(false)}
					/>
				) : (
					<ApartmentDetails
						apartment={apartment}
						street={building?.street}
						edit={() => setIsEditing(true)}
					/>
				)
			) : (
				<div>TODO: add skeleton</div>
			)}
		</div>
	);
}
