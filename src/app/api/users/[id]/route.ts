import { db } from '@/lib/drizzle/db';
import { users } from '@/lib/drizzle/schema/users';
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
				{ error: 'User id is required' },
				{ status: 400 }
			);

		const [user] = await db.select().from(users).where(eq(users.id, id));
		if (!user)
			return NextResponse.json({ error: 'User not found' }, { status: 404 });

		return NextResponse.json({ user }, { status: 200 });
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 });
	}
}
