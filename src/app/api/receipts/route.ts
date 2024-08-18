import { db } from '@/lib/drizzle/db';
import { insertApartmentSchema, Receipt, receipts } from '@/lib/drizzle/schema';
import { generateId } from 'lucia';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

export const dynamic = 'force-dynamic'; // defaults to auto

export async function GET() {
	try {
		const allReceipts = await db.select().from(receipts);

		return NextResponse.json({ receipts: allReceipts }, { status: 200 });
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 });
	}
}

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();

		const apartment = insertApartmentSchema.parse(body.apartment);
		const month = z.coerce.number().parse(body.month);
		const year = z.coerce.number().parse(body.year);

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

		return NextResponse.json({ receipts: createdReceipts }, { status: 200 });
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 });
	}
}
