import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const serverEnv = createEnv({
	server: {
		CLERK_SECRET_KEY: z.string(),
		WEBHOOK_SECRET: z.string(),

		POSTGRES_DATABASE: z.string(),
		POSTGRES_HOST: z.string(),
		POSTGRES_PASSWORD: z.string(),
		POSTGRES_PRISMA_URL: z.string(),
		POSTGRES_URL: z.string(),
		POSTGRES_URL_NON_POOLING: z.string(),
		POSTGRES_URL_NO_SSL: z.string(),
		POSTGRES_USER: z.string(),
	},
	runtimeEnv: {
		CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
		WEBHOOK_SECRET: process.env.WEBHOOK_SECRET,

		POSTGRES_DATABASE: process.env.POSTGRES_DATABASE,
		POSTGRES_HOST: process.env.POSTGRES_HOST,
		POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
		POSTGRES_PRISMA_URL: process.env.POSTGRES_PRISMA_URL,
		POSTGRES_URL: process.env.POSTGRES_URL,
		POSTGRES_URL_NON_POOLING: process.env.POSTGRES_URL_NON_POOLING,
		POSTGRES_URL_NO_SSL: process.env.POSTGRES_URL_NO_SSL,
		POSTGRES_USER: process.env.POSTGRES_USER,
	},
});
