import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

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
			const homeUrl = new URL('/', request.url);
			return NextResponse.redirect(homeUrl);
		}
	} else if (!isPublicRoute(request)) {
		protect();
	}
});

export const config = {
	matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
