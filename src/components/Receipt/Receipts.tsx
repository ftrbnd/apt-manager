import { Receipt as ReceiptType } from '@/lib/drizzle/schema/receipts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Receipt, ReceiptSkeleton } from './Receipt';
import { Skeleton } from '@/components/ui/skeleton';
import { monthNames } from '@/lib/utils';

interface Props {
	receipts: ReceiptType[];
	loading: boolean;
	filteredByApartment?: boolean;
}

export function Receipts({ receipts, loading, filteredByApartment }: Props) {
	if (loading)
		return (
			<div className='flex flex-col items-center max-w-5xl gap-4'>
				{filteredByApartment && <Skeleton className='h-8 w-[150px] self-end' />}
				{[1, 2, 3].map((i) => (
					<ReceiptSkeleton key={i} />
				))}
			</div>
		);

	if (receipts.length === 0)
		return (
			<Card>
				<CardHeader>
					<CardTitle>No receipts found.</CardTitle>
				</CardHeader>
				<CardContent>
					<p>
						{filteredByApartment
							? 'This apartment has no receipts yet.'
							: 'No receipts have been created yet.'}
					</p>
				</CardContent>
			</Card>
		);

	return receipts.map((receipt) => (
		<div
			key={receipt.id}
			className='flex flex-col items-center max-w-5xl gap-4'>
			{filteredByApartment && (
				<h5 className='self-end text-xl font-semibold tracking-tight text-right scroll-m-20'>
					{monthNames.get(receipt.month.toString())} {receipt.year}
				</h5>
			)}
			<Receipt
				apartmentId={receipt.apartmentId}
				receipt={receipt}
			/>
		</div>
	));
}
