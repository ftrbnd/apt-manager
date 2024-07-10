import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { db } from './lib/drizzle/db';
import { buildingsToManagers } from './lib/drizzle/schema';
import { eq } from 'drizzle-orm';

const isPublicRoute = createRouteMatcher([
	'/sign-in(.*)',
	'/sign-up(.*)',
	'/api/webhooks',
]);

const isOnboardingRoute = createRouteMatcher(['/onboarding(.*)']);

export default clerkMiddleware(async (auth, request) => {
	const { protect, userId, redirectToSignIn } = auth();

	if (isOnboardingRoute(request)) {
		if (!userId) {
			redirectToSignIn();
		} else {
			const userBuildings = await db
				.select()
				.from(buildingsToManagers)
				.where(eq(buildingsToManagers.managerId, userId));

			if (userBuildings.length > 0) {
				const homeUrl = new URL('/', request.url);
				return NextResponse.redirect(homeUrl);
			}
		}
	} else if (!isPublicRoute(request)) {
		protect();
	}
});

export const config = {
	matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
