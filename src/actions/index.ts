'use server';

import { db } from '@/lib/drizzle/db';
import { managerRequests } from '@/lib/drizzle/schema';
import { currentUser } from '@clerk/nextjs/server';

export async function sendManagerRequest(
	clerkUserId: string,
	buildingId: number
) {
	const user = await currentUser();
	if (!user) throw new Error('Unauthorized');

	await db.insert(managerRequests).values({ clerkUserId, buildingId });
}
