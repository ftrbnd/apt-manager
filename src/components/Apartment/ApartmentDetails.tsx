import { Apartment } from '@/lib/drizzle/schema';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Button } from '../ui/button';
import { formatRentChecks, toCamelCase } from '@/lib/utils';
import { Skeleton } from '../ui/skeleton';
interface Props {
	apartment?: Apartment;
	street?: string;
	edit: () => void;
	isLoading: boolean;
}

export function ApartmentDetails({
	apartment,
	street,
	edit,
	isLoading,
}: Props) {
	return (
		<Card className='w-full h-full'>
			<CardHeader>
				<CardTitle>Apartment #{isLoading ? '#' : apartment?.id}</CardTitle>
				{isLoading ? (
					<Skeleton className='h-4 w-[125px]' />
				) : (
					<CardDescription>{street}</CardDescription>
				)}
			</CardHeader>
			<CardContent>
				<h4 className='text-xl font-semibold tracking-tight'>Rent</h4>
				{isLoading ? (
					<Skeleton className='h-6 w-12' />
				) : (
					<RentDetails apartment={apartment} />
				)}
				<h4 className='mt-4 text-xl font-semibold tracking-tight'>Tenant</h4>
				{isLoading ? (
					<Skeleton className='h-6 w-36' />
				) : (
					<p className='leading-7'>{apartment?.tenant}</p>
				)}
				<h4 className='mt-4 text-xl font-semibold tracking-tight'>
					Payment method
				</h4>
				{isLoading ? (
					<Skeleton className='h-6 w-24' />
				) : (
					<p className='leading-7'>
						{apartment ? toCamelCase(apartment.paymentMethod) : ''}
					</p>
				)}
			</CardContent>
			<CardFooter>
				<Button onClick={edit}>Edit</Button>
			</CardFooter>
		</Card>
	);
}

const RentDetails = ({ apartment }: { apartment?: Apartment }) => {
	if (!apartment) {
		console.log('zero');

		return <p>$0</p>;
	}

	return apartment.rent.length > 1 ? (
		<div className='my-6 w-full overflow-y-auto'>
			<table className='w-full'>
				<thead>
					<tr className='m-0 border-t p-0 even:bg-muted'>
						<th className='border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right'>
							Splits
						</th>
					</tr>
				</thead>
				<tbody>
					{apartment.rent.map((value, i) => (
						<tr
							key={i}
							className='m-0 border-t p-0 even:bg-muted'>
							<td className='border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right'>
								${value}
							</td>
						</tr>
					))}
					<tr className='m-0 border-t p-0 even:bg-muted'>
						<td className='border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right'>
							Total: {formatRentChecks(apartment.rent)}
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	) : (
		<p>{formatRentChecks(apartment.rent)}</p>
	);
};
