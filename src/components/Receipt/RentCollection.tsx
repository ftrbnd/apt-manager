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
import { formatRentChecks, monthNames, toCamelCase } from '@/lib/utils';
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from '@/components/ui/hover-card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface Props {
	receipts: Receipt[];
	month: number;
	year: number;
}

export function RentCollection({ receipts, month, year }: Props) {
	const { apartments, apartmentsLoading } = useApartments();

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
							<CardTitle>
								Rent for
								<span className='mx-2 font-normal text-muted-foreground'>
									{monthNames.get(month.toString())} {year}
								</span>
							</CardTitle>
						</AccordionTrigger>
						<AccordionContent>
							<div className='flex flex-col gap-4'>
								{apartmentsLoading ? (
									[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((v) => (
										<CheckboxSkeleton key={v} />
									))
								) : apartments.length === 0 ? (
									<div className='flex items-center justify-between space-x-2 border rounded-md p-4'>
										<p className='text-muted-foreground'>
											No apartments registered.
										</p>
										<Button className='text-xs'>
											<Plus className='w-4 h-4 mr-2' />
											New apartment
										</Button>
									</div>
								) : (
									apartments.map((apartment) => (
										<HoverCard key={apartment.id}>
											<HoverCardTrigger asChild>
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
											</HoverCardTrigger>
											<HoverCardContent className='w-80'>
												<div className='flex space-x-4'>
													<Avatar>
														<AvatarFallback>{apartment.number}</AvatarFallback>
													</Avatar>
													<div className='space-y-1'>
														<h4 className='text-sm font-semibold'>
															{apartment.tenant}
														</h4>
														<p className='text-sm'>
															Rent: {formatRentChecks(apartment.rent)}
														</p>
														<div className='flex items-center pt-2'>
															<span className='text-xs text-muted-foreground'>
																Payment method:{' '}
																{toCamelCase(apartment.paymentMethod)}
															</span>
														</div>
													</div>
												</div>
											</HoverCardContent>
										</HoverCard>
									))
								)}
							</div>
						</AccordionContent>
					</CardContent>
				</AccordionItem>
			</Accordion>
		</Card>
	);
}

function CheckboxSkeleton() {
	return (
		<div className='flex items-center space-x-2'>
			<Checkbox checked={false} />
			<Skeleton className='w-24 h-5' />
		</div>
	);
}
