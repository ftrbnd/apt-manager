import { migrate } from 'drizzle-orm/vercel-postgres/migrator';
import { db } from './db';

const main = async () => {
	try {
		await migrate(db, { migrationsFolder: './drizzle' });

		console.log('Migration successful');
	} catch (e) {
		console.error(e);
		process.exit(1);
	}
};

main();
