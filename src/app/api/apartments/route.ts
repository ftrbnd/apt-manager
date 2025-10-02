import { validateRequest } from '@/actions/auth';
import { db } from '@/lib/drizzle/db';
import { apartments } from '@/lib/drizzle/schema/apartments';
import { usersBuildings } from '@/lib/drizzle/schema/users_buildings';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic'; // defaults to auto

export async function GET() {
	try {
		const { user } = await validateRequest();
		if (!user)
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

		const [manager] = await db
			.select()
			.from(usersBuildings)
			.where(eq(usersBuildings.userId, user.id));
		if (!manager.buildingId)
			return NextResponse.json(
				{ error: 'Manager has no building assigned' },
				{ status: 500 }
			);

		const allApartments = await db
			.select()
			.from(apartments)
			.where(eq(apartments.buildingId, manager.buildingId));

		return NextResponse.json({ apartments: allApartments }, { status: 200 });
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 });
	}
}
