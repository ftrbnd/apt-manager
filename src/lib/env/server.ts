import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const serverEnv = createEnv({
	server: {
		POSTGRES_DATABASE: z.string(),
		POSTGRES_HOST: z.string(),
		POSTGRES_PASSWORD: z.string(),
		POSTGRES_PRISMA_URL: z.string(),
		POSTGRES_URL: z.string(),
		POSTGRES_URL_NON_POOLING: z.string(),
		POSTGRES_URL_NO_SSL: z.string(),
		POSTGRES_USER: z.string(),

		AUTH_REDIRECT_URI: z.string(),
		APPLE_CLIENT_ID: z.string(),
		APPLE_TEAM_ID: z.string(),
		APPLE_KEY_ID: z.string(),
		APPLE_CERTIFICATE: z.string(),
	},
	runtimeEnv: {
		POSTGRES_DATABASE: process.env.POSTGRES_DATABASE,
		POSTGRES_HOST: process.env.POSTGRES_HOST,
		POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
		POSTGRES_PRISMA_URL: process.env.POSTGRES_PRISMA_URL,
		POSTGRES_URL: process.env.POSTGRES_URL,
		POSTGRES_URL_NON_POOLING: process.env.POSTGRES_URL_NON_POOLING,
		POSTGRES_URL_NO_SSL: process.env.POSTGRES_URL_NO_SSL,
		POSTGRES_USER: process.env.POSTGRES_USER,

		AUTH_REDIRECT_URI: process.env.AUTH_REDIRECT_URI,
		APPLE_CLIENT_ID: process.env.APPLE_CLIENT_ID,
		APPLE_TEAM_ID: process.env.APPLE_TEAM_ID,
		APPLE_KEY_ID: process.env.APPLE_KEY_ID,
		APPLE_CERTIFICATE: process.env.APPLE_CERTIFICATE,
	},
});
