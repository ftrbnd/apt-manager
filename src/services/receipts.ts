import { Apartment, Receipt } from '@/lib/drizzle/schema';

const RECEIPTS = '/api/receipts';

export const createReceipt = async (apartment?: Apartment) => {
	try {
		if (!apartment) throw new Error('Apartment is required');

		const res = await fetch(RECEIPTS, {
			method: 'POST',
			body: JSON.stringify({ apartment }),
		});
		if (!res.ok) throw new Error('Failed to get receipts');

		const { receipts }: { receipts: Receipt[] } = await res.json();
		return receipts;
	} catch (e) {
		console.error(e);
		throw e;
	}
};

export const getReceipts = async () => {
	try {
		const res = await fetch(RECEIPTS);
		if (!res.ok) throw new Error('Failed to get receipts');

		const { receipts }: { receipts: Receipt[] } = await res.json();
		return receipts;
	} catch (e) {
		console.error(e);
		throw e;
	}
};

export const getReceiptById = async (id?: string | null) => {
	try {
		if (!id) throw new Error('Receipt id is required');

		const res = await fetch(`${RECEIPTS}/${id}`);
		if (!res.ok) throw new Error(`Failed to get receipt with id ${id}`);

		const { receipt }: { receipt: Receipt } = await res.json();
		return receipt;
	} catch (e) {
		console.error(e);
		throw e;
	}
};
