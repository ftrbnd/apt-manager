import { db } from '@/lib/drizzle/db';
import { apartments, managerRequests } from '@/lib/drizzle/schema';
import { currentUser } from '@clerk/nextjs/server';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic'; // defaults to auto

export async function GET() {
	try {
		const user = await currentUser();
		if (!user)
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

		const [request] = await db
			.select()
			.from(managerRequests)
			.where(eq(managerRequests.clerkUserId, user.id));

		const allApartments = await db
			.select()
			.from(apartments)
			.where(eq(apartments.buildingId, request.buildingId));

		return NextResponse.json({ apartments: allApartments }, { status: 200 });
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 });
	}
}
