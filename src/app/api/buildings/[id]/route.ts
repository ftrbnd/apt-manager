import { db } from '@/lib/drizzle/db';
import { buildings } from '@/lib/drizzle/schema/buildings';
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
				{ error: 'Building id is required' },
				{ status: 400 }
			);

		const foundBuildings = await db
			.select()
			.from(buildings)
			.where(eq(buildings.id, id));
		if (foundBuildings.length === 0)
			return NextResponse.json(
				{ error: 'No buildings found' },
				{ status: 404 }
			);

		return NextResponse.json({ building: foundBuildings[0] }, { status: 200 });
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 });
	}
}
