import { db } from '@/lib/drizzle/db';
import { usersBuildings } from '@/lib/drizzle/schema/users_buildings';
import { eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic'; // defaults to auto

interface Params {
	params: {
		id: string;
	};
}

export async function GET(_request: NextRequest, { params }: Params) {
	try {
		const { id } = params;
		if (!id)
			return NextResponse.json(
				{ error: 'UserBuilding id is required' },
				{ status: 400 }
			);

		const [userBuilding] = await db
			.select()
			.from(usersBuildings)
			.where(eq(usersBuildings.id, id));
		if (!userBuilding)
			return NextResponse.json(
				{ error: 'UserBuilding not found' },
				{ status: 404 }
			);

		return NextResponse.json({ userBuilding }, { status: 200 });
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 });
	}
}
