import { db } from '@/lib/drizzle/db';
import { managers } from '@/lib/drizzle/schema';
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
				{ error: 'Manager id is required' },
				{ status: 400 }
			);

		const [manager] = await db
			.select()
			.from(managers)
			.where(eq(managers.id, id));
		if (!manager)
			return NextResponse.json({ error: 'Manager not found' }, { status: 404 });

		return NextResponse.json({ manager }, { status: 200 });
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 });
	}
}

export async function PATCH(_request: NextRequest, { params }: Params) {
	try {
		const { id } = params;
		if (!id)
			return NextResponse.json(
				{ error: 'Manager id is required' },
				{ status: 400 }
			);

		const [manager] = await db
			.update(managers)
			.set({
				approved: true,
			})
			.where(eq(managers.id, id))
			.returning();

		if (!manager)
			return NextResponse.json({ error: 'Manager not found' }, { status: 404 });

		return NextResponse.json({ manager }, { status: 200 });
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 });
	}
}

export async function DELETE(_request: NextRequest, { params }: Params) {
	try {
		const { id } = params;
		if (!id)
			return NextResponse.json(
				{ error: 'Manager id is required' },
				{ status: 400 }
			);

		await db.delete(managers).where(eq(managers.id, params.id));

		return NextResponse.json({ message: 'Deleted' }, { status: 200 });
	} catch (error) {
		console.log(error);

		return NextResponse.json({ error }, { status: 500 });
	}
}
