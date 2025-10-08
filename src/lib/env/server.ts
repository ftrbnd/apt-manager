import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const serverEnv = createEnv({
	server: {
		POSTGRES_URL: z.string().optional().default('PLACEHOLDER'),

		AUTH_REDIRECT_URI: z.string().optional().default('PLACEHOLDER'),
		APPLE_CLIENT_ID: z.string().optional().default('PLACEHOLDER'),
		APPLE_TEAM_ID: z.string().optional().default('PLACEHOLDER'),
		APPLE_KEY_ID: z.string().optional().default('PLACEHOLDER'),
		APPLE_CERTIFICATE: z.string().optional().default('PLACEHOLDER'),
	},
	runtimeEnv: {
		POSTGRES_URL: process.env.POSTGRES_URL,

		AUTH_REDIRECT_URI: process.env.AUTH_REDIRECT_URI,
		APPLE_CLIENT_ID: process.env.APPLE_CLIENT_ID,
		APPLE_TEAM_ID: process.env.APPLE_TEAM_ID,
		APPLE_KEY_ID: process.env.APPLE_KEY_ID,
		APPLE_CERTIFICATE: process.env.APPLE_CERTIFICATE,
	},
});
