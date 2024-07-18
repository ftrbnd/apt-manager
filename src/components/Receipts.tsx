import { Receipt as ReceiptType } from '@/lib/drizzle/schema';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Receipt, ReceiptSkeleton } from './Receipt';
import { Skeleton } from './ui/skeleton';

interface Props {
	receipts: ReceiptType[];
	loading: boolean;
	filteredByApartment?: boolean;
}

export function Receipts({ receipts, loading, filteredByApartment }: Props) {
	if (loading)
		return (
			<div className='max-w-5xl flex flex-col items-center gap-4'>
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

	const displayMonthYear = (receipt: ReceiptType) => {
		const date = new Date(receipt.date);
		return `${date.toLocaleDateString('en-US', {
			month: 'long',
			year: 'numeric',
		})}`;
	};

	return receipts.map((receipt) => (
		<div
			key={receipt.id}
			className='max-w-5xl flex flex-col items-center gap-4'>
			{filteredByApartment && (
				<h5 className='scroll-m-20 text-xl self-end text-right font-semibold tracking-tight'>
					{displayMonthYear(receipt)}
				</h5>
			)}
			<Receipt
				apartmentId={receipt.apartmentId}
				receipt={receipt}
			/>
		</div>
	));
}
