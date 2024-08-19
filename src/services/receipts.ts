import { Receipt } from '@/lib/drizzle/schema/receipts';

const RECEIPTS = '/api/receipts';

export const getReceipts = async () => {
	const res = await fetch(RECEIPTS);
	if (!res.ok) throw new Error('Failed to get receipts');

	const { receipts }: { receipts: Receipt[] } = await res.json();
	return receipts;
};

export const getReceiptById = async (id?: string | null) => {
	if (!id) throw new Error('Receipt id is required');

	const res = await fetch(`${RECEIPTS}/${id}`);
	if (!res.ok) throw new Error(`Failed to get receipt with id ${id}`);

	const { receipt }: { receipt: Receipt } = await res.json();
	return receipt;
};
