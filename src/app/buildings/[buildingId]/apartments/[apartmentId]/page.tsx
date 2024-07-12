'use client';

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import { getApartmentById } from '@/services/apartments';
import { EditApartmentForm } from '@/components/EditApartmentForm';

interface Params {
	buildingId: string;
	apartmentId: string;
}

export default function Page({ params }: { params: Params }) {
	const { data: apartment } = useQuery({
		queryKey: ['apartments', params.apartmentId],
		queryFn: () => getApartmentById(params.apartmentId),
	});

	return (
		<div className='flex min-h-screen w-full flex-col items-center justify-center bg-muted/40'>
			<Card className='w-[350px]'>
				<CardHeader>
					<CardTitle>Edit apartment</CardTitle>
					<CardDescription>Apartment #{apartment?.id ?? '#'}</CardDescription>
				</CardHeader>
				<CardContent>
					{/* TODO: add skeleton */}
					{apartment && <EditApartmentForm apartment={apartment} />}
				</CardContent>
			</Card>
		</div>
	);
}
