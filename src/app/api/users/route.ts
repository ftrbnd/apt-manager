import { db } from '@/lib/drizzle/db';
import { users } from '@/lib/drizzle/schema/users';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic'; // defaults to auto

export async function GET() {
	try {
		const allUsers = await db.select().from(users);

		return NextResponse.json({ users: allUsers }, { status: 200 });
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 });
	}
}
