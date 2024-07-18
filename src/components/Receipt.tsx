import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { formatRentChecks, spellOutRent } from '@/lib/utils';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { useApartments } from '@/hooks/useApartments';
import { Receipt as ReceiptType } from '@/lib/drizzle/schema';
import { useBuildings } from '@/hooks/useBuildings';
import { Skeleton } from './ui/skeleton';

interface Props {
	receipt: ReceiptType;
	apartmentId?: number;
}

export function Receipt({ receipt, apartmentId }: Props) {
	const { apartment } = useApartments(apartmentId?.toString());
	const { building } = useBuildings(apartment?.buildingId);

	const { dollars, cents } = spellOutRent(apartment?.rent);

	const receiptDate = new Date(receipt.date);
	const month = receiptDate.getMonth() + 1;
	const nextMonth = (month + 1) % 12;
	const year = receiptDate.getFullYear();

	return (
		<Card className='w-full'>
			<CardHeader className='flex-row items-center justify-between'>
				<CardTitle>Receipt</CardTitle>
				<div className='text-sm text-muted-foreground flex flex-row items-center justify-between gap-2 '>
					<p className='font-bold'>
						DATE
						<span className='ml-1 font-normal underline'>
							{month}-1-{year}
						</span>
					</p>
					<p className='font-bold'>
						No. <span className='ml-1 font-normal'>{receipt.id}</span>
					</p>
				</div>
			</CardHeader>
			<CardContent className='flex flex-col gap-4'>
				<div className='flex flex-col gap-4'>
					<div className='flex justify-between items-center gap-2'>
						<p className='flex-1 font-bold border rounded-md p-4 bg-muted/80'>
							RECEIVED FROM
							<span className='ml-1 font-normal underline'>
								{apartment?.tenant}
							</span>
						</p>
						<p className='border rounded-md p-4 bg-muted/80'>
							{formatRentChecks(apartment?.rent ?? [])}
						</p>
					</div>
					<div className='flex items-center justify-between gap-2 border rounded-md p-4 bg-muted/80'>
						<p className='underline'>
							{dollars}
							{cents > 0 && (
								<span className='ml-1 diagonal-fractions'>{cents}/100</span>
							)}
						</p>
						<p className='font-bold'>DOLLARS</p>
					</div>
					<div className='flex items-center justify-between w-full border rounded-md p-4 bg-muted/80'>
						<p className='font-bold'>FOR RENT</p>
						<p className='underline flex-1 text-right'>#{apartment?.number}</p>
					</div>
				</div>
				<div className='flex flex-col md:flex-row gap-2 justify-between'>
					<div className='my-6 overflow-y-auto'>
						<table className='w-full'>
							<tbody>
								<tr className='m-0 border-t p-0 even:bg-muted'>
									<td className='border px-2 py-2 font-bold'>ACCOUNT</td>
									<td className='border px-4 py-2 text-left'></td>
									<td className='border px-4 py-2 text-left'></td>
								</tr>
								<tr className='m-0 border-t p-0 even:bg-muted'>
									<td className='border px-2 py-2 font-bold'>PAYMENT</td>
									<td className='border px-4 py-2 text-left'></td>
									<td className='border px-4 py-2 text-left'></td>
								</tr>
								<tr className='m-0 border-t p-0 even:bg-muted'>
									<td className='border px-2 py-2 font-bold'>BAL. DUE</td>
									<td className='border px-4 py-2 text-left'></td>
									<td className='border px-4 py-2 text-left'></td>
								</tr>
							</tbody>
						</table>
					</div>

					<RadioGroup
						className='rounded-md border p-4 bg-muted/80'
						defaultValue={apartment?.paymentMethod}>
						<div className='flex items-center space-x-2'>
							<RadioGroupItem
								value='CASH'
								id='r1'
								disabled
							/>
							<Label htmlFor='r1'>CASH</Label>
						</div>
						<div className='flex items-center space-x-2'>
							<RadioGroupItem
								value='CHECK'
								id='r2'
								checked={apartment?.paymentMethod === 'CHECK'}
								disabled
							/>
							<Label htmlFor='r2'>CHECK</Label>
						</div>
						<div className='flex items-center space-x-2'>
							<RadioGroupItem
								value='MONEY ORDER'
								id='r3'
								checked={apartment?.paymentMethod === 'MONEY ORDER'}
								disabled
							/>
							<Label htmlFor='r3'>MONEY ORDER</Label>
						</div>
						<div className='flex items-center space-x-2'>
							<RadioGroupItem
								value='CREDIT CARD'
								id='r4'
								disabled
							/>
							<Label htmlFor='r4'>CREDIT CARD</Label>
						</div>
					</RadioGroup>

					<div className='flex-1 flex flex-col gap-2 justify-center'>
						<div className='flex items-center justify-between border rounded-md p-2 gap-2 bg-muted/80'>
							<p className='font-bold'>FROM</p>
							<p className='underline'>
								{month}-1-{year}
							</p>
							<p className='font-bold'>TO</p>
							<p className='underline'>
								{nextMonth}-1-{year}
							</p>
						</div>
						<div className='flex items-center border rounded-md p-2 gap-2 bg-muted/80'>
							<p className='font-bold'>BY</p>
							<p className='underline'>{building?.landlord}</p>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}

export function ReceiptSkeleton() {
	return (
		<Card className='w-full'>
			<CardHeader className='flex-row items-center justify-between'>
				<CardTitle>Receipt</CardTitle>
				<div className='text-sm text-muted-foreground flex flex-row items-center justify-between gap-2 '>
					<div className='font-bold flex items-center'>
						DATE
						<Skeleton className='ml-1 underline h-4 w-[100px]' />
					</div>
					<div className='font-bold flex items-center'>
						No.
						<Skeleton className='ml-1 h-4 w-[32px]' />
					</div>
				</div>
			</CardHeader>
			<CardContent className='flex flex-col gap-4'>
				<div className='flex flex-col gap-4'>
					<div className='flex justify-between gap-2'>
						<div className='font-bold border rounded-md p-4 w-3/5'>
							<div className='flex items-center w-full'>
								RECEIVED FROM
								<Skeleton className='ml-1 h-6 w-full md:w-[200px]' />
							</div>
						</div>
						<div className='border rounded-md p-4 w-2/5 flex items-center'>
							<Skeleton className='h-6 w-full md:w-[125px]' />
						</div>
					</div>
					<div className='flex items-center justify-between gap-2 border rounded-md p-4'>
						<Skeleton className='h-6 w-full' />
						<p className='font-bold'>DOLLARS</p>
					</div>
					<div className='flex items-center justify-between w-full border rounded-md p-4'>
						<p className='font-bold'>FOR RENT</p>
						<Skeleton className='h-6 w-[32px]' />
					</div>
				</div>
				<div className='flex flex-col md:flex-row gap-2 justify-between'>
					<div className='my-6 overflow-y-auto'>
						<table className='w-full'>
							<tbody>
								<tr className='m-0 border-t p-0 even:bg-muted'>
									<td className='border px-2 py-2 font-bold'>ACCOUNT</td>
									<td className='border px-4 py-2 text-left'></td>
									<td className='border px-4 py-2 text-left'></td>
								</tr>
								<tr className='m-0 border-t p-0 even:bg-muted'>
									<td className='border px-2 py-2 font-bold'>PAYMENT</td>
									<td className='border px-4 py-2 text-left'></td>
									<td className='border px-4 py-2 text-left'></td>
								</tr>
								<tr className='m-0 border-t p-0 even:bg-muted'>
									<td className='border px-2 py-2 font-bold'>BAL. DUE</td>
									<td className='border px-4 py-2 text-left'></td>
									<td className='border px-4 py-2 text-left'></td>
								</tr>
							</tbody>
						</table>
					</div>

					<RadioGroup className='rounded-md border p-4 bg-muted/80'>
						<div className='flex items-center space-x-2'>
							<RadioGroupItem
								value='CASH'
								id='r1'
								disabled
							/>
							<Label htmlFor='r1'>CASH</Label>
						</div>
						<div className='flex items-center space-x-2'>
							<RadioGroupItem
								value='CHECK'
								id='r2'
								disabled
							/>
							<Label htmlFor='r2'>CHECK</Label>
						</div>
						<div className='flex items-center space-x-2'>
							<RadioGroupItem
								value='MONEY ORDER'
								id='r3'
								disabled
							/>
							<Label htmlFor='r3'>MONEY ORDER</Label>
						</div>
						<div className='flex items-center space-x-2'>
							<RadioGroupItem
								value='CREDIT CARD'
								id='r4'
								disabled
							/>
							<Label htmlFor='r4'>CREDIT CARD</Label>
						</div>
					</RadioGroup>

					<div className='flex-1 flex flex-col gap-2 justify-center'>
						<div className='flex items-center justify-between border rounded-md p-2 gap-2'>
							<p className='font-bold'>FROM</p>
							<Skeleton className='h-6 w-[100px]' />
							<p className='font-bold'>TO</p>
							<Skeleton className='h-6 w-[100px]' />
						</div>
						<div className='flex items-center border rounded-md p-2 gap-2'>
							<p className='font-bold'>BY</p>
							<Skeleton className='h-6 w-[200px]' />
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
