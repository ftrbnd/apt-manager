import { serverEnv } from '@/lib/env';
import { defineConfig, Config } from 'drizzle-kit';

export default defineConfig({
	schema: './src/lib/drizzle/schema/*.ts',
	out: './drizzle',
	dialect: 'postgresql',
	dbCredentials: {
		url: serverEnv.POSTGRES_URL,
	},
}) satisfies Config;
