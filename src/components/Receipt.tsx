import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from './ui/card';
import { formatRentChecks, spellOutRent } from '@/lib/utils';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { useApartments } from '@/hooks/useApartments';
import { Receipt as ReceiptType } from '@/lib/drizzle/schema';

interface Props {
	receipt: ReceiptType;
	apartmentId?: number;
}

export function Receipt({ receipt, apartmentId }: Props) {
	const { apartment } = useApartments(apartmentId?.toString());

	const { dollars, cents } = spellOutRent(apartment?.rent);

	return (
		<Card>
			<CardHeader>
				<CardTitle>Receipt</CardTitle>
				<CardDescription>Date</CardDescription>
			</CardHeader>
			<CardContent>
				<div>
					<div className='flex items-center space-x-4'>
						<div className='flex justify-between items-center gap-4'>
							<p className='font-bold underline'>
								RECEIVED FROM
								<span className='font-normal'>{'   ' + apartment?.tenant}</span>
							</p>
						</div>
						<p className='rounded-md border p-4'>
							{formatRentChecks(apartment?.rent ?? [])}
						</p>
					</div>
					<div className='flex items-center justify-between'>
						<p className='underline'>
							{dollars}
							{cents > 0 && (
								<span className='diagonal-fractions'>{cents}/100</span>
							)}
						</p>
						<p className='font-bold'>DOLLARS</p>
					</div>
					<div className='flex items-center justify-between w-full'>
						<p className='font-bold'>FOR RENT</p>
						<p className='underline flex-1 text-right'>#{apartment?.number}</p>
					</div>
				</div>
				<div className='flex gap-2 justify-between'>
					{/* TODO: account payment bal.due table */}

					<RadioGroup
						className='rounded-md border p-4'
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

					<div>
						<div className='flex items-center justify-between'>
							<p className='font-bold'>FROM</p>
							<p className='underline'>{'START OF MONTH'}</p>
							<p className='font-bold'>TO</p>
							<p className='underline'>{'END OF MONTH'}</p>
						</div>
						<div className='flex items-center'>
							<p className='font-bold'>BY</p>
							<p className='underline'>{'BUILDING OWNER'}</p>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
