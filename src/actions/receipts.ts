import { db } from '@/lib/drizzle/db';
import { Apartment } from '@/lib/drizzle/schema/apartments';
import { Receipt, receipts } from '@/lib/drizzle/schema/receipts';
import { generateId } from 'lucia';

export async function createReceipt(
	apartment: Apartment,
	month: number,
	year: number
) {
	const createdReceipts = await db.transaction(async (tx) => {
		const newReceipts: Receipt[] = [];

		for (const value of apartment.rent) {
			const [newReceipt] = await tx
				.insert(receipts)
				.values({
					id: generateId(15),
					apartmentId: apartment.id,
					month,
					year,
					value,
					tenant: apartment.tenant,
					paymentMethod: apartment.paymentMethod,
				})
				.returning();

			newReceipts.push(newReceipt);
		}

		return newReceipts;
	});

	return createdReceipts;
}