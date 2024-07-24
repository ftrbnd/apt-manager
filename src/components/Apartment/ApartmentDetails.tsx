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
import { Pencil } from 'lucide-react';
import { useReceipts } from '@/hooks/useReceipts';
import { Receipts } from '../Receipts';
import { CreateReceiptMenu } from '../CreateReceiptMenu';
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
	const { receipts, receiptsLoading } = useReceipts();

	const apartmentReceipts = receipts
		.filter((receipt) => receipt.apartmentId === apartment?.id)
		.sort((a, b) => {
			const aDate = new Date(`${a.month + 1}-01-${a.year}`);
			const bDate = new Date(`${b.month + 1}-01-${b.year}`);

			return bDate.getTime() - aDate.getTime();
		});

	return (
		<div className='flex flex-col justify-between w-full gap-8 md:flex-row'>
			<Card className='h-full min-w-fit md:w-1/4'>
				<CardHeader>
					<CardTitle>Apartment #{isLoading ? '#' : apartment?.id}</CardTitle>
					{isLoading || !street ? (
						<Skeleton className='h-5 w-[125px]' />
					) : (
						<CardDescription>{street}</CardDescription>
					)}
				</CardHeader>
				<CardContent>
					<h4 className='text-xl font-semibold tracking-tight'>Rent</h4>
					{isLoading ? (
						<Skeleton className='w-12 h-6' />
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
						<Skeleton className='w-24 h-6' />
					) : (
						<p className='leading-7'>
							{apartment ? toCamelCase(apartment.paymentMethod) : ''}
						</p>
					)}
				</CardContent>
				<CardFooter className='justify-between gap-2'>
					<Button
						variant='secondary'
						disabled={receiptsLoading}
						onClick={edit}>
						<Pencil className='w-4 h-4 mr-2' />
						Edit
					</Button>
					{!isLoading && apartment && (
						<CreateReceiptMenu
							apartment={apartment}
							aptReceipts={apartmentReceipts}
						/>
					)}
				</CardFooter>
			</Card>

			<div className='flex flex-col max-w-screen-lg gap-4 md:w-3/4'>
				<h4 className='text-2xl font-semibold tracking-tight scroll-m-20'>
					Receipts
				</h4>
				<Receipts
					receipts={apartmentReceipts}
					loading={receiptsLoading}
					filteredByApartment
				/>
			</div>
		</div>
	);
}

const RentDetails = ({ apartment }: { apartment?: Apartment }) => {
	if (!apartment) return <p>$0</p>;

	return apartment.rent.length > 1 ? (
		<div className='w-full my-6 overflow-y-auto'>
			<table className='w-full'>
				<thead>
					<tr className='p-0 m-0 border-t even:bg-muted'>
						<th className='border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right'>
							Splits
						</th>
					</tr>
				</thead>
				<tbody>
					{apartment.rent.map((value, i) => (
						<tr
							key={i}
							className='p-0 m-0 border-t even:bg-muted'>
							<td className='border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right'>
								${value}
							</td>
						</tr>
					))}
					<tr className='p-0 m-0 border-t even:bg-muted'>
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
