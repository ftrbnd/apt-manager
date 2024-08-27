import { db } from '@/lib/drizzle/db';
import { receipts } from '@/lib/drizzle/schema/receipts';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic'; // defaults to auto

export async function GET() {
	try {
		const allReceipts = await db.select().from(receipts);

		return NextResponse.json({ receipts: allReceipts }, { status: 200 });
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 });
	}
}
