import { db } from '@/lib/drizzle/db';
import { selectApartmentSchema, apartments } from '@/lib/drizzle/schema';
import { eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic'; // defaults to auto

interface Params {
	params: {
		id: number;
	};
}

export async function GET(_request: NextRequest, { params }: Params) {
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

export async function PATCH(request: NextRequest, { params }: Params) {
	try {
		const { id } = params;
		if (!id)
			return NextResponse.json(
				{ error: 'Apartment id is required' },
				{ status: 400 }
			);

		const body = await request.json();
		const apartment = selectApartmentSchema.parse(body.apartment);

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

export async function DELETE(_request: NextRequest, { params }: Params) {
	try {
		const { id } = params;
		if (!id)
			return NextResponse.json(
				{ error: 'Apartment id is required' },
				{ status: 400 }
			);

		await db.delete(apartments).where(eq(apartments.id, id));

		return NextResponse.json({ message: 'Deleted' }, { status: 200 });
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 });
	}
}
