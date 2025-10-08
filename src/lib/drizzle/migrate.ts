import { readMigrationFiles } from 'drizzle-orm/migrator';

const main = async () => {
	try {
		readMigrationFiles({ migrationsFolder: './drizzle' });

		console.log('Migration successful');
	} catch (e) {
		console.error(e);
		process.exit(1);
	}
};

main();
