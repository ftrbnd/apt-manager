'use server';

import { cookies } from 'next/headers';
import { cache } from 'react';

import { lucia } from '@/lib/auth/lucia';
import type { Session, User } from 'lucia';
import { redirect } from 'next/navigation';

export const validateRequest = cache(
	async (): Promise<
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
	}
);

export const getUser = async () => {
	const { user } = await validateRequest();

	return user;
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
