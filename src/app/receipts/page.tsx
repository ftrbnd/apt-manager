'use client';

import { Receipt } from '@/components/Receipt';
import { useReceipts } from '@/hooks/useReceipts';

export default function Page() {
	const { receipts } = useReceipts();

	return (
		<div className='flex min-h-screen w-full flex-col items-center bg-muted/40 p-4 md:p-8 gap-4 md:gap-8'>
			<h2 className='scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0'>
				All Receipts
			</h2>
			{receipts?.map((receipt) => (
				<Receipt
					key={receipt.id}
					receipt={receipt}
					apartmentId={receipt.apartmentId}
				/>
			))}
		</div>
	);
}
