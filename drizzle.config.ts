import { env } from '@/lib/env';
import { defineConfig, Config } from 'drizzle-kit';

export default defineConfig({
	schema: './src/lib/drizzle/schema.ts',
	out: './migrations',
	dialect: 'postgresql',
	dbCredentials: {
		url: env.POSTGRES_URL,
	},
}) satisfies Config;
