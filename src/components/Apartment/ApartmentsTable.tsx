'use client';

import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from '../ui/card';
import {
	Table,
	TableHeader,
	TableRow,
	TableHead,
	TableBody,
	TableCell,
} from '../ui/table';
import { useQuery } from '@tanstack/react-query';
import { getApartments } from '@/services/apartments';
import { getBuildingById } from '@/services/buildings';
import { Skeleton } from '../ui/skeleton';
import { useRouter } from 'next/navigation';

const sum = (nums: number[]) => nums.reduce((a, b) => a + b, 0).toFixed(2);

export function ApartmentsTable() {
	const { data: apartments, isLoading: apartmentsLoading } = useQuery({
		queryKey: ['apartments'],
		queryFn: getApartments,
	});

	const buildingId = apartments ? apartments[0].buildingId : null;

	const {
		data: building,
		isLoading: buildingLoading,
		isPending: buildingPending,
	} = useQuery({
		queryKey: ['buildings', buildingId],
		queryFn: () => getBuildingById(buildingId),
		enabled: buildingId !== null,
	});

	const sortedApartments = apartments?.sort((a, b) => a.id - b.id);

	const router = useRouter();

	return (
		<Card
			className='xl:col-span-2'
			x-chunk='dashboard-01-chunk-4'>
			<CardHeader className='flex flex-row items-center'>
				<div className='grid gap-2'>
					<CardTitle>Apartments</CardTitle>

					{buildingLoading || buildingPending ? (
						<Skeleton className='h-4 w-[150px]' />
					) : (
						<CardDescription>{building?.street}</CardDescription>
					)}
				</div>
			</CardHeader>
			<CardContent>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>#</TableHead>
							<TableHead>Tenant</TableHead>
							<TableHead>Rent</TableHead>
							<TableHead>Payment Method</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{apartmentsLoading &&
							[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => (
								<TableRow key={num}>
									<TableCell>
										<Skeleton className='h-6 w-[25px]' />
									</TableCell>
									<TableCell>
										<Skeleton className='h-6 w-[300px]' />
									</TableCell>
									<TableCell>
										<Skeleton className='h-6 w-[200px]' />
									</TableCell>
									<TableCell>
										<Skeleton className='h-6 w-[200px]' />
									</TableCell>
								</TableRow>
							))}

						{sortedApartments?.map((apartment) => (
							<TableRow
								className='cursor-pointer'
								key={apartment.id}
								onClick={() =>
									router.push(
										`/buildings/${apartment.buildingId}/apartments/${apartment.id}`
									)
								}>
								<TableCell>
									<div className='font-medium'>{apartment.id}</div>
								</TableCell>
								<TableCell>{apartment.tenant}</TableCell>
								<TableCell>${sum(apartment.rent)}</TableCell>
								<TableCell>{apartment.paymentMethod}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	);
}
