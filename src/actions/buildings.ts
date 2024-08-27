'use server';

import { db } from '@/lib/drizzle/db';
import { buildings, NewBuilding } from '@/lib/drizzle/schema/buildings';

export async function createBuilding(newBuilding: NewBuilding) {
	const [building] = await db.insert(buildings).values(newBuilding).returning();

	return building;
}
