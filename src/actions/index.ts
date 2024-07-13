'use server';

import { db } from '@/lib/drizzle/db';
import {
	Apartment,
	apartments,
	buildingsToManagers,
} from '@/lib/drizzle/schema';
import { currentUser } from '@clerk/nextjs/server';
import { eq } from 'drizzle-orm';

export async function assignManagerToBuilding(
	managerId: string,
	buildingId: number
) {
	const user = await currentUser();
	if (!user) throw new Error('No current user found');

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

export async function updateApartment(apartment: Apartment) {
	const updatedApartments = await db
		.update(apartments)
		.set(apartment)
		.where(eq(apartments.id, apartment.id))
		.returning();

	return updatedApartments[0];
}
