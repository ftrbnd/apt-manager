import { db } from '@/lib/drizzle/db';
import { managerRequests } from '@/lib/drizzle/schema';
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
				{ error: 'Manager request id is required' },
				{ status: 400 }
			);

		const [managerRequest] = await db
			.select()
			.from(managerRequests)
			.where(eq(managerRequests.id, id));
		if (!managerRequest)
			return NextResponse.json(
				{ error: 'Manager request not found' },
				{ status: 404 }
			);

		return NextResponse.json({ managerRequest }, { status: 200 });
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 });
	}
}

export async function PATCH(_request: NextRequest, { params }: Params) {
	try {
		const { id } = params;
		if (!id)
			return NextResponse.json(
				{ error: 'Manager request id is required' },
				{ status: 400 }
			);

		const [managerRequest] = await db
			.update(managerRequests)
			.set({
				approved: true,
			})
			.where(eq(managerRequests.id, id))
			.returning();

		if (!managerRequest)
			return NextResponse.json(
				{ error: 'Manager request not found' },
				{ status: 404 }
			);

		return NextResponse.json({ managerRequest }, { status: 200 });
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 });
	}
}

export async function DELETE(_request: NextRequest, { params }: Params) {
	try {
		const { id } = params;
		if (!id)
			return NextResponse.json(
				{ error: 'Manager request id is required' },
				{ status: 400 }
			);

		await db.delete(managerRequests).where(eq(managerRequests.id, params.id));

		return NextResponse.json({ message: 'Deleted' }, { status: 200 });
	} catch (error) {
		console.log(error);

		return NextResponse.json({ error }, { status: 500 });
	}
}
