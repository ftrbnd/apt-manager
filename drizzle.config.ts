import '@/lib/drizzle/envConfig';
import { defineConfig, Config } from 'drizzle-kit';

export default defineConfig({
	schema: './src/lib/drizzle/schema.ts',
	out: './migrations',
	dialect: 'postgresql',
	dbCredentials: {
		url: process.env.POSTGRES_URL!,
	},
}) satisfies Config;
