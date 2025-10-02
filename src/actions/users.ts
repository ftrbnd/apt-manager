'use server';

import { db } from '@/lib/drizzle/db';
import { NewUser, User, users } from '@/lib/drizzle/schema/users';
import { eq } from 'drizzle-orm';

export async function createUser(newUser: NewUser) {
	const [user] = await db.insert(users).values(newUser).returning();

	return user;
}

export async function updateUser(user: User) {
	const [updatedUser] = await db
		.update(users)
		.set(user)
		.where(eq(users.id, user.id))
		.returning();

	return updatedUser;
}

export async function deleteUser(user: User) {
	await db.delete(users).where(eq(users.id, user.id));
}
