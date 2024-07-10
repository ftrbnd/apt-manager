'use server';

import { db } from '@/lib/drizzle/db';
import { buildingsToManagers } from '@/lib/drizzle/schema';
import { env } from '@/lib/env';
import { currentUser, auth, clerkClient } from '@clerk/nextjs/server';
import { eq } from 'drizzle-orm';

export async function assignManagerToBuilding(
	managerId: string,
	buildingId: number
) {
	const user = await currentUser();
	if (!user) throw new Error('No current user found');
	if (user.primaryEmailAddress?.emailAddress !== env.ADMIN_EMAIL)
		throw new Error('Unauthorized user');

	await db.insert(buildingsToManagers).values({ managerId, buildingId });
}

export async function userIsManager() {
	const user = await currentUser();
	if (!user) throw new Error('Unauthorized');

	const pairings = await db
		.select()
		.from(buildingsToManagers)
		.where(eq(buildingsToManagers.managerId, user.id));

	return pairings.length > 0;
}

export const completeOnboarding = async (buildingId: number) => {
	const { userId } = auth();

	if (!userId) {
		return { message: 'No Logged In User' };
	}

	try {
		// assign building to manager
		await db.insert(buildingsToManagers).values({
			managerId: userId,
			buildingId,
		});

		const res = await clerkClient().users.updateUser(userId, {
			publicMetadata: {
				onboardingComplete: true,
			},
		});
		return { message: res.publicMetadata };
	} catch (err) {
		console.log(err);

		return { error: 'There was an error updating the user metadata.' };
	}
};
