import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const clientEnv = createEnv({
	client: {
		NEXT_PUBLIC_AUTH_REDIRECT_URI: z.string(),
	},
	runtimeEnv: {
		NEXT_PUBLIC_AUTH_REDIRECT_URI: process.env.NEXT_PUBLIC_AUTH_REDIRECT_URI,
	},
});
