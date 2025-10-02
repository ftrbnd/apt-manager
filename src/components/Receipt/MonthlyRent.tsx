'use client';

import { useReceipts } from '@/hooks/useReceipts';
import { RentCollection } from './RentCollection';

export function MonthlyRent() {
	const { receipts } = useReceipts();
	const today = new Date();

	return (
		<RentCollection
			receipts={receipts}
			month={today.getMonth()}
			year={today.getFullYear()}
		/>
	);
}
