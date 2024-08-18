import { cookies } from 'next/headers';
import { AppleTokens, OAuth2RequestError } from 'arctic';
import { apple } from '@/lib/auth/apple';
import { db } from '@/lib/drizzle/db';
import { managers } from '@/lib/drizzle/schema';
import { eq } from 'drizzle-orm';
import { lucia } from '@/lib/auth/lucia';
import { parseJWT } from 'oslo/jwt';

export async function POST(request: Request): Promise<Response> {
	const formData = await request.formData();

	const code = formData.get('code');
	const state = formData.get('state');
	const storedState = cookies().get('apple_oauth_state')?.value ?? null;

	if (!code || !state || !storedState || state !== storedState) {
		return new Response(null, {
			status: 400,
		});
	}

	try {
		const tokens: AppleTokens = await apple.validateAuthorizationCode(
			code.toString()
		);
		const jwt = parseJWT(tokens.idToken);
		const payload = jwt?.payload as any;
		const userId = payload.sub as string;

		const [existingUser] = await db
			.select()
			.from(managers)
			.where(eq(managers.id, userId));

		if (existingUser) {
			const session = await lucia.createSession(existingUser.id, {});
			const sessionCookie = lucia.createSessionCookie(session.id);
			cookies().set(
				sessionCookie.name,
				sessionCookie.value,
				sessionCookie.attributes
			);
			return new Response(null, {
				status: 302,
				headers: {
					Location: '/',
				},
			});
		}

		await db.insert(managers).values({
			id: userId,
		});

		const session = await lucia.createSession(userId, {});
		const sessionCookie = lucia.createSessionCookie(session.id);
		cookies().set(
			sessionCookie.name,
			sessionCookie.value,
			sessionCookie.attributes
		);
		return new Response(null, {
			status: 302,
			headers: {
				Location: '/',
			},
		});
	} catch (e) {
		console.log(e);

		// the specific error message depends on the provider
		if (e instanceof OAuth2RequestError) {
			// invalid code
			return new Response(null, {
				status: 400,
			});
		}
		return new Response(null, {
			status: 500,
		});
	}
}
