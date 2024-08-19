'use server';

import { db } from '@/lib/drizzle/db';
import {
	NewUserBuilding,
	UserBuilding,
	usersBuildings,
} from '@/lib/drizzle/schema/users_buildings';

export async function createUserBuilding(newUserBuilding: NewUserBuilding) {
	const [userBuilding] = await db
		.insert(usersBuildings)
		.values(newUserBuilding)
		.returning();

	return userBuilding;
}

export async function updateUserBuilding(userBuilding: UserBuilding) {
	const [newUserBuilding] = await db
		.update(usersBuildings)
		.set(userBuilding)
		.returning();

	return newUserBuilding;
}
