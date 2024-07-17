import { Receipt as ReceiptType } from '@/lib/drizzle/schema';
import { Receipt } from '../Receipt';

interface Props {
	receipts?: ReceiptType[];
	apartmentId?: number;
}

export function ApartmentReceipts({ receipts, apartmentId }: Props) {
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
		</div>
	);
}
