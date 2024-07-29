import { db } from '@/lib/drizzle/db';
import {
	apartments,
	insertApartmentSchema,
	managers,
} from '@/lib/drizzle/schema';
import { currentUser } from '@clerk/nextjs/server';
import { eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic'; // defaults to auto

export async function GET() {
	try {
		const user = await currentUser();
		if (!user)
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

		const [manager] = await db
			.select()
			.from(managers)
			.where(eq(managers.clerkUserId, user.id));

		const allApartments = await db
			.select()
			.from(apartments)
			.where(eq(apartments.buildingId, manager.buildingId));

		return NextResponse.json({ apartments: allApartments }, { status: 200 });
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 });
	}
}

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		const parsedApartment = insertApartmentSchema.parse(body.apartment);

		console.log(parsedApartment);

		const [apartment] = await db
			.insert(apartments)
			.values(parsedApartment)
			.returning();

		return NextResponse.json({ apartment }, { status: 200 });
	} catch (error) {
		console.log(error);

		return NextResponse.json({ error }, { status: 500 });
	}
}
