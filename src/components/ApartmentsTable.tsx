'use client';

import Link from 'next/link';
import { Button } from './ui/button';
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from './ui/card';
import {
	Table,
	TableHeader,
	TableRow,
	TableHead,
	TableBody,
	TableCell,
} from './ui/table';
import { ArrowUpRight } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { getApartments } from '@/services/apartments';
import { getBuildingById } from '@/services/buildings';

const sum = (nums: number[]) => nums.reduce((a, b) => a + b, 0).toFixed(2);

export function ApartmentsTable() {
	const { data: apartments } = useQuery({
		queryKey: ['apartments'],
		queryFn: getApartments,
	});

	const buildingId = apartments ? apartments[0].buildingId : null;

	const { data: building } = useQuery({
		queryKey: ['buildings', buildingId],
		queryFn: () => getBuildingById(buildingId),
		enabled: buildingId !== null,
	});

	return (
		<Card
			className='xl:col-span-2'
			x-chunk='dashboard-01-chunk-4'>
			<CardHeader className='flex flex-row items-center'>
				<div className='grid gap-2'>
					<CardTitle>Apartments</CardTitle>
					<CardDescription>{building?.street}</CardDescription>
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
						{apartments?.map((apartment) => (
							<TableRow key={apartment.id}>
								<TableCell>
									<div className='font-medium'>{apartment.id}</div>
								</TableCell>
								<TableCell>{apartment.tenant}</TableCell>
								<TableCell>{sum(apartment.rent)}</TableCell>
								<TableCell>{apartment.paymentMethod}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	);
}
