'use server';

import { db } from '@/lib/drizzle/db';
import {
	Apartment,
	apartments,
	NewApartment,
} from '@/lib/drizzle/schema/apartments';
import { eq } from 'drizzle-orm';

export async function createApartment(newApartment: NewApartment) {
	const [apartment] = await db
		.insert(apartments)
		.values(newApartment)
		.returning();

	return apartment;
}

export async function updateApartment(apartment: Apartment) {
	const [updatedApartment] = await db
		.update(apartments)
		.set(apartment)
		.where(eq(apartments.id, apartment.id))
		.returning();

	return updatedApartment;
}

export async function deleteApartment(apartment: Apartment) {
	await db.delete(apartments).where(eq(apartments.id, apartment.id));
}
