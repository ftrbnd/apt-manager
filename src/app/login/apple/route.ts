import { apple } from '@/lib/auth/apple';
import { generateState } from 'arctic';
import { cookies } from 'next/headers';

export async function GET(): Promise<Response> {
	const state = generateState();
	const url = await apple.createAuthorizationURL(state, {
		scopes: ['email', 'name'],
	});
	url.searchParams.set('response_mode', 'form_post');

	cookies().set('apple_oauth_state', state, {
		secure: true, // set to false in localhost
		path: '/',
		httpOnly: true,
		maxAge: 60 * 10, // 10 min
		sameSite: 'none', // IMPORTANT!
	});

	return Response.redirect(url);
}
