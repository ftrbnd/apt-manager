import { db } from '@/lib/drizzle/db';
import { receipts } from '@/lib/drizzle/schema';
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
		const apartmentId = z.number().parse(body.apartmentId);

		const newReceipts = await db
			.insert(receipts)
			.values({
				apartmentId,
				date: new Date().toLocaleDateString(),
			})
			.returning();

		return NextResponse.json({ receipt: newReceipts[0] }, { status: 200 });
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 });
	}
}
