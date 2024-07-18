import { Apartment, Receipt } from '@/lib/drizzle/schema';
import { displayMonthYear } from '@/lib/utils';
import {
	Accordion,
	AccordionItem,
	AccordionTrigger,
	AccordionContent,
} from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { useApartments } from '@/hooks/useApartments';
import Link from 'next/link';

interface Props {
	receipts: Receipt[];
}

export function RentCollection({ receipts }: Props) {
	const { apartments } = useApartments();

	const today = new Date();

	const apartmentPaidRent = (apartment: Apartment) => {
		const aptReceipts = receipts.filter(
			(receipt) => receipt.apartmentId === apartment.id
		);

		const lastReceipt = aptReceipts.at(-1);
		if (!lastReceipt) return false;

		const lastReceiptMonth = new Date(lastReceipt.date).getMonth();

		return today.getMonth() === lastReceiptMonth;
	};

	return (
		<Card>
			<Accordion
				type='single'
				defaultValue='item-1'
				collapsible>
				<AccordionItem value='item-1'>
					<CardContent className='pt-6'>
						<AccordionTrigger className='hover:no-underline'>
							<CardTitle className='font-normal'>
								Rent collected for
								<span className='mx-2 font-bold'>
									{displayMonthYear(today)}
								</span>
							</CardTitle>
						</AccordionTrigger>
						<AccordionContent>
							<div className='flex flex-col gap-4'>
								{apartments.map((apartment) => (
									<div
										key={apartment.id}
										className='flex items-center space-x-2'>
										<Checkbox
											id='paid_rent'
											checked={apartmentPaidRent(apartment)}
										/>
										<Link
											href={`/apartments/${apartment.id}`}
											className='text-sm font-medium hover:underline'>
											Apartment #{apartment.number}
										</Link>
									</div>
								))}
							</div>
						</AccordionContent>
					</CardContent>
				</AccordionItem>
			</Accordion>
		</Card>
	);
}
