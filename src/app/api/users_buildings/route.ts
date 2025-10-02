import { db } from '@/lib/drizzle/db';
import { usersBuildings } from '@/lib/drizzle/schema/users_buildings';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic'; // defaults to auto

export async function GET() {
	try {
		const allUserBuildings = await db.select().from(usersBuildings);

		return NextResponse.json(
			{ userBuildings: allUserBuildings },
			{ status: 200 }
		);
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 });
	}
}
