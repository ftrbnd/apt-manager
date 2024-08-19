import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { formatRentChecks, spellOutRent } from '@/lib/utils';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useApartments } from '@/hooks/useApartments';
import { Receipt as ReceiptType } from '@/lib/drizzle/schema/receipts';
import { useBuildings } from '@/hooks/useBuildings';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Loader2, Printer } from 'lucide-react';

interface Props {
	receipt: ReceiptType;
	apartmentId?: string;
}

export function Receipt({ receipt, apartmentId }: Props) {
	const { apartment } = useApartments(apartmentId?.toString());
	const { building } = useBuildings(apartment?.buildingId);

	const { dollars, cents } = spellOutRent([receipt.value]);
	const nextMonth = ((receipt.month + 1) % 12) + 1;

	const printReceipt = () => {
		console.log('TODO');
	};

	return (
		<Card className='w-full'>
			<CardHeader className='flex-row items-center justify-between'>
				<CardTitle>Receipt</CardTitle>
				<div className='flex flex-row items-center justify-between gap-2 text-sm text-muted-foreground '>
					<p className='font-bold'>
						DATE
						<span className='ml-1 font-normal underline'>
							{receipt.month + 1}-1-{receipt.year}
						</span>
					</p>
					<p className='font-bold'>
						No. <span className='ml-1 font-normal'>{receipt.id}</span>
					</p>
					<Button
						variant='secondary'
						onClick={printReceipt}>
						<Printer className='w-4 h-4 mr-2' />
						Print
					</Button>
				</div>
			</CardHeader>
			<CardContent className='flex flex-col gap-4'>
				<div className='flex flex-col gap-4'>
					<div className='flex items-center justify-between gap-2'>
						<p className='flex-1 p-4 font-bold border rounded-md bg-muted/80'>
							RECEIVED FROM
							<span className='ml-1 font-normal underline'>
								{apartment?.tenant}
							</span>
						</p>
						<p className='p-4 border rounded-md bg-muted/80'>
							{formatRentChecks([receipt.value])}
						</p>
					</div>
					<div className='flex items-center justify-between gap-2 p-4 border rounded-md bg-muted/80'>
						<p className='underline'>
							{dollars}
							{cents > 0 && (
								<span className='ml-1 diagonal-fractions'>{cents}/100</span>
							)}
						</p>
						<p className='font-bold'>DOLLARS</p>
					</div>
					<div className='flex items-center justify-between w-full p-4 border rounded-md bg-muted/80'>
						<p className='font-bold'>FOR RENT</p>
						<p className='flex-1 text-right underline'>#{apartment?.number}</p>
					</div>
				</div>
				<div className='flex flex-col justify-between gap-2 md:flex-row'>
					<div className='my-6 overflow-y-auto'>
						<table className='w-full'>
							<tbody>
								<tr className='p-0 m-0 border-t even:bg-muted'>
									<td className='px-2 py-2 font-bold border'>ACCOUNT</td>
									<td className='px-4 py-2 text-left border'></td>
									<td className='px-4 py-2 text-left border'></td>
								</tr>
								<tr className='p-0 m-0 border-t even:bg-muted'>
									<td className='px-2 py-2 font-bold border'>PAYMENT</td>
									<td className='px-4 py-2 text-left border'></td>
									<td className='px-4 py-2 text-left border'></td>
								</tr>
								<tr className='p-0 m-0 border-t even:bg-muted'>
									<td className='px-2 py-2 font-bold border'>BAL. DUE</td>
									<td className='px-4 py-2 text-left border'></td>
									<td className='px-4 py-2 text-left border'></td>
								</tr>
							</tbody>
						</table>
					</div>

					<RadioGroup
						className='p-4 border rounded-md bg-muted/80'
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

					<div className='flex flex-col justify-center flex-1 gap-2'>
						<div className='flex items-center justify-between gap-2 p-2 border rounded-md bg-muted/80'>
							<p className='font-bold'>FROM</p>
							<p className='underline'>
								{receipt.month + 1}-1-{receipt.year}
							</p>
							<p className='font-bold'>TO</p>
							<p className='underline'>
								{nextMonth}-1-{receipt.year}
							</p>
						</div>
						<div className='flex items-center gap-2 p-2 border rounded-md bg-muted/80'>
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
				<div className='flex flex-row items-center justify-between gap-2 text-sm text-muted-foreground '>
					<div className='flex items-center font-bold'>
						DATE
						<Skeleton className='ml-1 underline h-4 w-[100px]' />
					</div>
					<div className='flex items-center font-bold'>
						No.
						<Skeleton className='ml-1 h-4 w-[32px]' />
					</div>
					<Button
						variant='secondary'
						disabled>
						<Loader2 className='w-4 h-4 mr-2 animate-spin' />
						Print
					</Button>
				</div>
			</CardHeader>
			<CardContent className='flex flex-col gap-4'>
				<div className='flex flex-col gap-4'>
					<div className='flex justify-between gap-2'>
						<div className='w-3/5 p-4 font-bold border rounded-md'>
							<div className='flex items-center w-full'>
								RECEIVED FROM
								<Skeleton className='ml-1 h-6 w-full md:w-[200px]' />
							</div>
						</div>
						<div className='flex items-center w-2/5 p-4 border rounded-md'>
							<Skeleton className='h-6 w-full md:w-[125px]' />
						</div>
					</div>
					<div className='flex items-center justify-between gap-2 p-4 border rounded-md'>
						<Skeleton className='w-full h-6' />
						<p className='font-bold'>DOLLARS</p>
					</div>
					<div className='flex items-center justify-between w-full p-4 border rounded-md'>
						<p className='font-bold'>FOR RENT</p>
						<Skeleton className='h-6 w-[32px]' />
					</div>
				</div>
				<div className='flex flex-col justify-between gap-2 md:flex-row'>
					<div className='my-6 overflow-y-auto'>
						<table className='w-full'>
							<tbody>
								<tr className='p-0 m-0 border-t even:bg-muted'>
									<td className='px-2 py-2 font-bold border'>ACCOUNT</td>
									<td className='px-4 py-2 text-left border'></td>
									<td className='px-4 py-2 text-left border'></td>
								</tr>
								<tr className='p-0 m-0 border-t even:bg-muted'>
									<td className='px-2 py-2 font-bold border'>PAYMENT</td>
									<td className='px-4 py-2 text-left border'></td>
									<td className='px-4 py-2 text-left border'></td>
								</tr>
								<tr className='p-0 m-0 border-t even:bg-muted'>
									<td className='px-2 py-2 font-bold border'>BAL. DUE</td>
									<td className='px-4 py-2 text-left border'></td>
									<td className='px-4 py-2 text-left border'></td>
								</tr>
							</tbody>
						</table>
					</div>

					<RadioGroup className='p-4 border rounded-md bg-muted/80'>
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

					<div className='flex flex-col justify-center flex-1 gap-2'>
						<div className='flex items-center justify-between gap-2 p-2 border rounded-md'>
							<p className='font-bold'>FROM</p>
							<Skeleton className='h-6 w-[100px]' />
							<p className='font-bold'>TO</p>
							<Skeleton className='h-6 w-[100px]' />
						</div>
						<div className='flex items-center gap-2 p-2 border rounded-md'>
							<p className='font-bold'>BY</p>
							<Skeleton className='h-6 w-[200px]' />
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
