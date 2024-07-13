import { db } from '@/lib/drizzle/db';
import { apartments, buildingsToManagers } from '@/lib/drizzle/schema';
import { currentUser } from '@clerk/nextjs/server';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic'; // defaults to auto

export async function GET() {
	try {
		const user = await currentUser();
		if (!user)
			return NextResponse.json({ error: 'No user found' }, { status: 401 });

		const pairings = await db
			.select()
			.from(buildingsToManagers)
			.where(eq(buildingsToManagers.managerId, user.id));
		const pairing = pairings[0];

		const allApartments = await db
			.select()
			.from(apartments)
			.where(eq(apartments.buildingId, pairing.buildingId));

		return NextResponse.json({ apartments: allApartments }, { status: 200 });
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 });
	}
}
