'use client';

import { Receipts } from '@/components/Receipts';
import { useReceipts } from '@/hooks/useReceipts';
import { RentCollection } from '@/components/RentCollection';
import { useState } from 'react';
import { RentMonthSelect } from '@/components/RentMonthSelect';

export default function Page() {
	const { receipts, receiptsLoading } = useReceipts();

	const today = new Date();
	const [month, setMonth] = useState((today.getMonth() + 1).toString());
	const [year, setYear] = useState(today.getFullYear().toString());

	const filteredReceipts = receipts.filter((receipt) => {
		const receiptDate = new Date(receipt.date);

		return (
			(receiptDate.getMonth() + 1).toString() === month &&
			receiptDate.getFullYear().toString() === year
		);
	});

	return (
		<div className='flex min-h-screen w-full flex-col items-center bg-muted/40 p-4 md:p-8 gap-4 md:gap-8'>
			<h2 className='scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0'>
				All Receipts
			</h2>

			<div className='grid grid-cols-2 gap-4'>
				<RentMonthSelect
					receipts={receipts}
					month={month}
					setMonth={setMonth}
					year={year}
					setYear={setYear}
				/>
			</div>

			<div className='flex flex-col md:flex-row gap-8 w-full justify-center items-start'>
				<RentCollection
					receipts={receipts}
					month={parseInt(month)}
					year={parseInt(year)}
				/>
				<div className='flex flex-col gap-4 w-full max-w-screen-lg'>
					<Receipts
						receipts={filteredReceipts}
						loading={receiptsLoading}
					/>
				</div>
			</div>
		</div>
	);
}
