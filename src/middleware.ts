import { verifyRequestOrigin } from 'lucia';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { db } from './lib/drizzle/db';
import { managers, managersBuildings, sessions } from './lib/drizzle/schema';
import { eq } from 'drizzle-orm';
import { cookies } from 'next/headers';
import { lucia } from './lib/auth/lucia';

export async function middleware(request: NextRequest) {
	const onApiRoute = request.nextUrl.pathname.startsWith('/api');
	if (onApiRoute) {
		if (request.method === 'GET') return NextResponse.next();

		const originHeader = request.headers.get('Origin');
		const hostHeader = request.headers.get('Host');
		if (
			!originHeader ||
			!hostHeader ||
			!verifyRequestOrigin(originHeader, [hostHeader, 'appleid.apple.com'])
		) {
			return new NextResponse(null, {
				status: 403,
			});
		}
	}

	const onLoginPage = request.nextUrl.pathname.startsWith('/login');
	const onOnboardingPage = request.nextUrl.pathname.startsWith('/onboarding');
	const onAccountPage = request.nextUrl.pathname.startsWith('/account');
	const onAllowedPage = onOnboardingPage || onAccountPage;

	const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
	if (!sessionId) {
		if (!onLoginPage) {
			return NextResponse.redirect(new URL('/login', request.url));
		}
		return NextResponse.next();
	}

	const [session] = await db
		.select()
		.from(sessions)
		.where(eq(sessions.id, sessionId));

	if (session) {
		const [manager] = await db
			.select()
			.from(managers)
			.where(eq(managers.id, session.userId))
			.innerJoin(managersBuildings, eq(managers.id, session.userId));

		if (!manager) {
			if (!onAllowedPage) {
				return NextResponse.redirect(new URL('/onboarding', request.url));
			}

			return NextResponse.next();
		} else if (
			!onLoginPage &&
			!onAllowedPage &&
			!manager.managers_buildings.approved
		) {
			return NextResponse.redirect(new URL('/onboarding', request.url));
		} else if (onOnboardingPage && manager.managers_buildings.approved) {
			return NextResponse.redirect(new URL('/', request.url));
		} else if (onLoginPage) {
			return NextResponse.redirect(new URL('/', request.url));
		}
	} else {
		if (!onLoginPage || onOnboardingPage) {
			return NextResponse.redirect(new URL('/login', request.url));
		}
	}
}

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
