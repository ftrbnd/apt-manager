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
	const { protect, userId, redirectToSignIn } = auth();

	const onOnboardingPage = isOnboardingRoute(request);
	const onPrivatePage = !isPublicRoute(request) && !onOnboardingPage;
	const onAccountPage = isAccountRoute(request);
	const onApiRoute = isApiRoute(request);

	if (onApiRoute) {
		return NextResponse.next();
	}

	if (userId) {
		const [manager] = await db
			.select()
			.from(managers)
			.where(eq(managers.clerkUserId, userId));

		if (!manager) {
			if (!onOnboardingPage && !onAccountPage) {
				const onboardingUrl = new URL('/onboarding', request.url);

				return NextResponse.redirect(onboardingUrl);
			}
			return NextResponse.next();
		} else if (onPrivatePage && !manager.approved) {
			const onboardingUrl = new URL('/onboarding', request.url);
			return NextResponse.redirect(onboardingUrl);
		} else if (onOnboardingPage && manager.approved) {
			const homeUrl = new URL('/', request.url);
			return NextResponse.redirect(homeUrl);
		}
	} else {
		if (isOnboardingRoute(request)) redirectToSignIn();
		else if (!isPublicRoute(request)) protect();
	}
});

export const config = {
	matcher: ['/((?!.*\\..*|_next).*)', '/(trpc|api)(.*)'],
};
