import { Apartment, Receipt } from '@/lib/drizzle/schema';
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
import { monthNames } from '@/lib/utils';

interface Props {
	receipts: Receipt[];
	month: number;
	year: number;
}

export function RentCollection({ receipts, month, year }: Props) {
	const { apartments } = useApartments();

	const apartmentPaidRent = (apartment: Apartment) => {
		const aptReceipts = receipts.filter(
			(receipt) =>
				receipt.apartmentId === apartment.id &&
				receipt.month === month &&
				receipt.year === year
		);

		return aptReceipts.length > 0;
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
									{monthNames.get(month.toString())} {year}
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
