import { monthNames } from '@/lib/utils';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Dispatch, SetStateAction } from 'react';
import { Receipt } from '@/lib/drizzle/schema/receipts';

interface Props {
	receipts: Receipt[];
	month: string;
	setMonth: Dispatch<SetStateAction<string>>;
	year: string;
	setYear: Dispatch<SetStateAction<string>>;
}

export function RentMonthSelect({
	receipts,
	month,
	setMonth,
	year,
	setYear,
}: Props) {
	const today = new Date();

	const years = () => {
		const receiptYears = receipts.map((r) =>
			new Date(r.createdAt ?? '').getFullYear()
		);
		const thisYear = today.getFullYear();

		if (receiptYears.length === 0) receiptYears.push(thisYear);

		const earliestYear = Math.min(...receiptYears);

		const range: number[] = [];
		for (let i = earliestYear; i <= thisYear; i++) range.push(i);

		return range;
	};

	return (
		<>
			<Select
				defaultValue={month}
				onValueChange={setMonth}>
				<SelectTrigger className='w-[150px]'>
					<SelectValue placeholder='Month' />
				</SelectTrigger>
				<SelectContent>
					{[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((month) => (
						<SelectItem
							key={month}
							value={month.toString()}
							disabled={
								month > today.getMonth() &&
								parseInt(year) === today.getFullYear()
							}>
							{monthNames.get(month.toString())}
						</SelectItem>
					))}
				</SelectContent>
			</Select>

			<Select
				defaultValue={year}
				onValueChange={setYear}>
				<SelectTrigger className='w-[150px]'>
					<SelectValue placeholder='Year' />
				</SelectTrigger>
				<SelectContent>
					{years().map((year) => (
						<SelectItem
							key={year}
							value={year.toString()}>
							{year}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</>
	);
}
