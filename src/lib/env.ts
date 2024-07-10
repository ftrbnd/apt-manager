import z from 'zod';

const envSchema = z.object({
	CLERK_SECRET_KEY: z.string(),
	NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string(),
	NEXT_PUBLIC_CLERK_SIGN_IN_URL: z.string(),
	NEXT_PUBLIC_CLERK_SIGN_UP_URL: z.string(),
	NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL: z.string(),
	NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL: z.string(),
	WEBHOOK_SECRET: z.string(),

	POSTGRES_DATABASE: z.string(),
	POSTGRES_HOST: z.string(),
	POSTGRES_PASSWORD: z.string(),
	POSTGRES_PRISMA_URL: z.string(),
	POSTGRES_URL: z.string(),
	POSTGRES_URL_NON_POOLING: z.string(),
	POSTGRES_URL_NO_SSL: z.string(),
	POSTGRES_USER: z.string(),

	ADMIN_EMAIL: z.string().email(),
});

export const env = envSchema.parse(process.env);
