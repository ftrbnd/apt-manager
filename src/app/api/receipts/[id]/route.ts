import { db } from '@/lib/drizzle/db';
import { receipts } from '@/lib/drizzle/schema/receipts';
import { eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic'; // defaults to auto

export async function GET(
	_request: NextRequest,
	{ params }: { params: { id: string } }
) {
	try {
		const { id } = params;
		if (!id)
			return NextResponse.json(
				{ error: 'Receipt id is required' },
				{ status: 400 }
			);

		const [receipt] = await db
			.select()
			.from(receipts)
			.where(eq(receipts.id, id));
		if (!receipt)
			return NextResponse.json(
				{ error: 'Receipt not found found' },
				{ status: 404 }
			);

		return NextResponse.json({ receipt }, { status: 200 });
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 });
	}
}
