import { Apartment } from '@/lib/drizzle/schema/apartments';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { formatRentChecks, toCamelCase } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import { Pencil } from 'lucide-react';
import { useReceipts } from '@/hooks/useReceipts';
import { Receipts } from '../Receipt/Receipts';
import { CreateReceiptMenu } from '../Receipt/CreateReceiptMenu';
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
		<div className='grid grid-cols-1 md:grid-cols-5 gap-y-4 md:gap-x-4 w-full'>
			<Card className='md:col-span-2 h-min w-full md:w-3/4'>
				<CardHeader>
					<CardTitle>
						Apartment #{isLoading ? '#' : apartment?.number}
					</CardTitle>
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
						<p className='leading-7 text-muted-foreground'>
							{apartment?.tenant}
						</p>
					)}
					<h4 className='mt-4 text-xl font-semibold tracking-tight'>
						Payment method
					</h4>
					{isLoading ? (
						<Skeleton className='w-24 h-6' />
					) : (
						<p className='leading-7 text-muted-foreground'>
							{apartment ? toCamelCase(apartment.paymentMethod) : ''}
						</p>
					)}
					<h4 className='mt-4 text-xl font-semibold tracking-tight'>Note</h4>
					{isLoading ? (
						<div className='grid grid-rows-3 gap-2'>
							<Skeleton className='w-48 h-6' />
							<Skeleton className='w-48 h-6' />
							<Skeleton className='w-48 h-6' />
						</div>
					) : (
						<p className='leading-7 text-muted-foreground line-clamp-3'>
							{apartment?.note && apartment.note !== ''
								? apartment.note
								: 'n/a'}
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

			<div className='col-span-3 flex flex-col gap-4'>
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
		<p className='text-muted-foreground'>{formatRentChecks(apartment.rent)}</p>
	);
};
