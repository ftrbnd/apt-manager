import { db } from '@/lib/drizzle/db';
import { apartments } from '@/lib/drizzle/schema/apartments';
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
