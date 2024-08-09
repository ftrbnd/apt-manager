import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { db } from './lib/drizzle/db';
import { managers } from './lib/drizzle/schema';
import { eq } from 'drizzle-orm';

const isPublicRoute = createRouteMatcher([
	'/sign-in(.*)',
	'/sign-up(.*)',
	'/api/webhooks',
]);

const isOnboardingRoute = createRouteMatcher(['/onboarding(.*)']);
const isAccountRoute = createRouteMatcher(['/account(.*)']);
const isApiRoute = createRouteMatcher('/api(.*)');

export default clerkMiddleware(async (auth, request) => {
	const { protect, userId } = auth();

	if (isApiRoute(request)) {
		return NextResponse.next();
	}

	const onOnboardingPage = isOnboardingRoute(request);
	const onPrivatePage = !isPublicRoute(request);
	const onAccountPage = isAccountRoute(request);

	const onAllowedPage = onOnboardingPage || onAccountPage;

	if (userId) {
		const [manager] = await db
			.select()
			.from(managers)
			.where(eq(managers.clerkUserId, userId));

		if (!manager) {
			if (!onAllowedPage) {
				const onboardingUrl = new URL('/onboarding', request.url);
				return NextResponse.redirect(onboardingUrl);
			}

			return NextResponse.next();
		} else if (onPrivatePage && !onAllowedPage && !manager.approved) {
			const onboardingUrl = new URL('/onboarding', request.url);
			return NextResponse.redirect(onboardingUrl);
		} else if (onOnboardingPage && manager.approved) {
			const homeUrl = new URL('/', request.url);
			return NextResponse.redirect(homeUrl);
		}
	} else {
		if (onPrivatePage || onOnboardingPage) protect();
	}
});

export const config = {
	matcher: [
		// Skip Next.js internals and all static files, unless found in search params
		'/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
		// Always run for API routes
		'/(api|trpc)(.*)',
	],
};
