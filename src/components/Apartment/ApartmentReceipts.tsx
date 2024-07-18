import { Receipt as ReceiptType } from '@/lib/drizzle/schema';
import { Receipt } from '../Receipt';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '../ui/card';

interface Props {
	receipts?: ReceiptType[];
	apartmentId?: number;
	loading: boolean;
}

export function ApartmentReceipts({ receipts, apartmentId, loading }: Props) {
	const displayMonthYear = (receipt: ReceiptType) => {
		const date = new Date(receipt.date);
		return `${date.toLocaleDateString('en-US', {
			month: 'long',
			year: 'numeric',
		})}`;
	};

	return (
		<div className='md:w-3/4 max-w-screen-lg flex flex-col gap-2'>
			<h4 className='scroll-m-20 text-2xl font-semibold tracking-tight'>
				Receipts
			</h4>
			{loading &&
				[1, 2, 3].map((num) => (
					<div
						key={num}
						className='even:bg-muted'>
						{/* TODO: add Receipt skeleton */}
						loading...
					</div>
				))}
			{receipts?.map((receipt) => (
				<div
					key={receipt.id}
					className='max-w-5xl'>
					<h5 className='scroll-m-20 text-xl text-right font-semibold tracking-tight'>
						{displayMonthYear(receipt)}
					</h5>
					<Receipt
						apartmentId={apartmentId}
						receipt={receipt}
					/>
				</div>
			))}
			{receipts?.length === 0 && !loading && (
				<Card>
					<CardHeader>
						<CardTitle>No receipts found.</CardTitle>
					</CardHeader>
					<CardContent>
						<p> This apartment has no receipts yet.</p>
					</CardContent>
				</Card>
			)}
		</div>
	);
}
