import { serverEnv } from '@/lib/env';
import { drizzle } from 'drizzle-orm/neon-http';

export const db = drizzle(serverEnv.POSTGRES_URL);
