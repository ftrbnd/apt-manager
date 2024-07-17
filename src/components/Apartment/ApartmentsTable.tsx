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
import { Skeleton } from '../ui/skeleton';
import { useRouter } from 'next/navigation';
import { formatRentChecks, toCamelCase } from '@/lib/utils';
import { useApartments } from '@/hooks/useApartments';
import { useBuildings } from '@/hooks/useBuildings';

export function ApartmentsTable() {
	const { apartments, apartmentsLoading } = useApartments();
	const { building, buildingLoading, buildingPending } = useBuildings(
		apartments.length > 0 ? apartments[0].buildingId : undefined
	);

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
								<TableRow
									key={num}
									className='even:bg-muted'>
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

						{apartments?.map((apartment) => (
							<TableRow
								className='cursor-pointer even:bg-muted'
								key={apartment.id}
								onClick={() => router.push(`/apartments/${apartment.id}`)}>
								<TableCell>
									<div className='font-medium'>{apartment.id}</div>
								</TableCell>
								<TableCell>{apartment.tenant}</TableCell>
								<TableCell>{formatRentChecks(apartment.rent)}</TableCell>
								<TableCell>{toCamelCase(apartment.paymentMethod)}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	);
}
