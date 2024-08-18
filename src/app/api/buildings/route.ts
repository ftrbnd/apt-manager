import { db } from '@/lib/drizzle/db';
import { buildings, insertBuildingSchema } from '@/lib/drizzle/schema';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic'; // defaults to auto

export async function GET() {
	try {
		const allBuildings = await db.select().from(buildings);

		return NextResponse.json({ buildings: allBuildings }, { status: 200 });
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 });
	}
}

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		console.log(body);

		const parsedBuilding = insertBuildingSchema.parse(body.building);

		console.log({ parsedBuilding });

		const [building] = await db
			.insert(buildings)
			.values(parsedBuilding)
			.returning();

		return NextResponse.json({ building }, { status: 200 });
	} catch (error) {
		console.log(error);

		return NextResponse.json({ error }, { status: 500 });
	}
}
