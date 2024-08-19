'use server';

import { lucia } from '@/lib/auth/lucia';
import type { Session, User } from 'lucia';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { UserFormValues } from '@/components/Authentication/ProfileForm';
import { eq } from 'drizzle-orm';
import { db } from '@/lib/drizzle/db';
import { users } from '@/lib/drizzle/schema/users';

export const getUser = async () => {
	const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
	if (!sessionId) return null;
	const { user, session } = await lucia.validateSession(sessionId);
	try {
		if (session && session.fresh) {
			const sessionCookie = lucia.createSessionCookie(session.id);
			cookies().set(
				sessionCookie.name,
				sessionCookie.value,
				sessionCookie.attributes
			);
		}
		if (!session) {
			const sessionCookie = lucia.createBlankSessionCookie();
			cookies().set(
				sessionCookie.name,
				sessionCookie.value,
				sessionCookie.attributes
			);
		}
	} catch {
		// Next.js throws error when attempting to set cookies when rendering page
	}
	return user;
};

export const updateUser = async (values: UserFormValues) => {
	const user = await getUser();
	if (!user) throw new Error('Unauthorized');

	await db
		.update(users)
		.set({
			firstName: values.firstName,
			lastName: values.lastName,
			email: values.email,
		})
		.where(eq(users.id, user.id));

	const newUser = await getUser();
	return newUser;
};

export const deleteUser = async () => {
	const user = await getUser();
	if (!user) throw new Error('Unauthorized');

	await db.delete(users).where(eq(users.id, user.id));
};

export const validateRequest = async (): Promise<
	{ user: User; session: Session } | { user: null; session: null }
> => {
	const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
	if (!sessionId) {
		return {
			user: null,
			session: null,
		};
	}

	const result = await lucia.validateSession(sessionId);
	// next.js throws when you attempt to set cookie when rendering page
	try {
		if (result.session && result.session.fresh) {
			const sessionCookie = lucia.createSessionCookie(result.session.id);
			cookies().set(
				sessionCookie.name,
				sessionCookie.value,
				sessionCookie.attributes
			);
		}
		if (!result.session) {
			const sessionCookie = lucia.createBlankSessionCookie();
			cookies().set(
				sessionCookie.name,
				sessionCookie.value,
				sessionCookie.attributes
			);
		}
	} catch {}
	return result;
};

export const signOut = async () => {
	const { session } = await validateRequest();
	if (!session) {
		return {
			error: 'Unauthorized',
		};
	}

	await lucia.invalidateSession(session.id);

	const sessionCookie = lucia.createBlankSessionCookie();
	cookies().set(
		sessionCookie.name,
		sessionCookie.value,
		sessionCookie.attributes
	);
	return redirect('/login');
};

//
