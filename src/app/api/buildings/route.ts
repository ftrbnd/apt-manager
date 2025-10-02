import { db } from '@/lib/drizzle/db';
import { buildings } from '@/lib/drizzle/schema/buildings';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic'; // defaults to auto

export async function GET() {
	try {
		const allBuildings = await db.select().from(buildings);

		return NextResponse.json({ buildings: allBuildings }, { status: 200 });
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 });
	}
}
