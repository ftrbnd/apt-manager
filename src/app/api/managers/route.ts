import { db } from '@/lib/drizzle/db';
import { insertManagerSchema, managers } from '@/lib/drizzle/schema';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic'; // defaults to auto

export async function GET() {
	try {
		const allManagers = await db.select().from(managers);

		return NextResponse.json({ managers: allManagers }, { status: 200 });
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 });
	}
}

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		const parsedManager = insertManagerSchema.parse(body.manager);

		const [manager] = await db
			.insert(managers)
			.values(parsedManager)
			.returning();

		return NextResponse.json({ manager }, { status: 200 });
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 });
	}
}
