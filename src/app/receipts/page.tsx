'use client';

import { Receipts } from '@/components/Receipt/Receipts';
import { useReceipts } from '@/hooks/useReceipts';
import { RentCollection } from '@/components/Receipt/RentCollection';
import { useState } from 'react';
import { RentMonthSelect } from '@/components/Receipt/RentMonthSelect';

export default function Page() {
	const { receipts, receiptsLoading } = useReceipts();

	const today = new Date();
	const [month, setMonth] = useState(today.getMonth().toString());
	const [year, setYear] = useState(today.getFullYear().toString());

	const filteredReceipts = receipts
		.filter(
			(receipt) =>
				receipt.month.toString() === month && receipt.year.toString() === year
		)
		.sort(
			(a, b) =>
				new Date(`${a.createdAt}`).getTime() -
				new Date(`${b.createdAt}`).getTime()
		);

	return (
		<div className='flex flex-col items-center w-full min-h-screen gap-4 p-4 bg-muted/40 md:p-8 md:gap-8'>
			<h2 className='pb-2 text-3xl font-semibold tracking-tight border-b scroll-m-20 first:mt-0'>
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

			<div className='grid items-start justify-center w-full grid-cols-1 gap-8 md:flex '>
				<RentCollection
					receipts={receipts}
					month={parseInt(month)}
					year={parseInt(year)}
				/>
				<div className='flex flex-col w-full max-w-screen-lg gap-4'>
					<Receipts
						receipts={filteredReceipts}
						loading={receiptsLoading}
					/>
				</div>
			</div>
		</div>
	);
}
