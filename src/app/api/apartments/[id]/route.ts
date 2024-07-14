import { db } from '@/lib/drizzle/db';
import { apartmentSchema, apartments } from '@/lib/drizzle/schema';
import { eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic'; // defaults to auto

export async function GET(
	_request: NextRequest,
	{ params }: { params: { id: number } }
) {
	try {
		const { id } = params;
		if (!id)
			return NextResponse.json(
				{ error: 'Apartment id is required' },
				{ status: 400 }
			);

		const foundApartments = await db
			.select()
			.from(apartments)
			.where(eq(apartments.id, id));
		if (foundApartments.length === 0)
			return NextResponse.json(
				{ error: 'No apartments found' },
				{ status: 404 }
			);

		return NextResponse.json(
			{ apartment: foundApartments[0] },
			{ status: 200 }
		);
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 });
	}
}

export async function PATCH(
	request: NextRequest,
	{ params }: { params: { id: number } }
) {
	try {
		const { id } = params;
		if (!id)
			return NextResponse.json(
				{ error: 'Apartment id is required' },
				{ status: 400 }
			);

		const body = await request.json();
		const apartment = apartmentSchema.parse(body.apartment);

		const updatedApartments = await db
			.update(apartments)
			.set(apartment)
			.where(eq(apartments.id, apartment.id))
			.returning();

		return NextResponse.json(
			{ apartment: updatedApartments[0] },
			{ status: 200 }
		);
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 });
	}
}
