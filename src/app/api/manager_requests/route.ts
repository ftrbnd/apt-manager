import { db } from '@/lib/drizzle/db';
import {
	insertManagerRequestSchema,
	managerRequests,
} from '@/lib/drizzle/schema';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic'; // defaults to auto

export async function GET() {
	try {
		const requests = await db.select().from(managerRequests);

		return NextResponse.json({ managerRequests: requests }, { status: 200 });
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 });
	}
}

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		const parsedRequest = insertManagerRequestSchema.parse(body.managerRequest);

		const [managerRequest] = await db
			.insert(managerRequests)
			.values(parsedRequest)
			.returning();

		return NextResponse.json({ managerRequest }, { status: 200 });
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 });
	}
}
