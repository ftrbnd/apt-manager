import { useReceipts } from '@/hooks/useReceipts';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Apartment, Receipt as ReceiptType } from '@/lib/drizzle/schema';
import { Check, Loader2, Receipt } from 'lucide-react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { RentMonthSelect } from './RentMonthSelect';
import { useState } from 'react';

interface Props {
	apartment: Apartment;
	aptReceipts: ReceiptType[];
}

export function CreateReceiptMenu({ apartment, aptReceipts }: Props) {
	const { create, createPending, receiptsLoading } = useReceipts();

	const today = new Date();
	const [month, setMonth] = useState(today.getMonth().toString());
	const [year, setYear] = useState(today.getFullYear().toString());

	const receiptExistsForChosenMonth = aptReceipts.some(
		(receipt) =>
			receipt.month.toString() === month && receipt.year.toString() == year
	);

	const handleClick = async () => {
		const isPlural = apartment.rent.length > 1;

		if (receiptExistsForChosenMonth) {
			const pluralSensitive = isPlural ? 'Receipts' : 'A receipt';
			const existsPlural = isPlural ? 'exist' : 'exists';

			toast.warning(
				`${pluralSensitive} already ${existsPlural} for this month!`
			);
		} else {
			const promise = () =>
				create({ apartment, month: parseInt(month), year: parseInt(year) });

			const pluralSensitive = isPlural ? 'receipts' : 'receipt';

			toast.promise(promise, {
				loading: `Creating ${pluralSensitive}...`,
				success: `Created ${pluralSensitive} for Apartment #${apartment?.number}`,
				error: `Failed to create ${pluralSensitive}`,
			});
		}
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button disabled={createPending || receiptsLoading}>
					{createPending ? (
						<Loader2 className='w-4 h-4 mr-2 animate-spin' />
					) : (
						<Receipt className='w-4 h-4 mr-2' />
					)}
					Create {(apartment?.rent.length ?? 1) > 1 ? 'receipts' : 'receipt'}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuLabel>Select month</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem className='flex gap-2'>
					<RentMonthSelect
						receipts={aptReceipts}
						month={month}
						setMonth={setMonth}
						year={year}
						setYear={setYear}
					/>
				</DropdownMenuItem>
				<DropdownMenuItem>
					<Button
						className='w-full'
						onClick={handleClick}
						disabled={createPending}>
						{createPending ? (
							<Loader2 className='w-4 h-4 mr-2 animate-spin' />
						) : (
							<Check className='w-4 h-4 mr-2' />
						)}
						Create
					</Button>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
