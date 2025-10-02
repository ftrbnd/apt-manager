import { sql } from 'drizzle-orm';
import { db } from './db';

export const reset = async () => {
	try {
		const tables = db._.schema;
		if (!tables) throw new Error('No schema found');

		const queries = Object.values(tables).map((table) => {
			return sql.raw(/* sql */ `DROP TABLE IF EXISTS ${table.dbName} CASCADE;`);
		});

		await db.transaction(async (tx) => {
			for (const query of queries) {
				await tx.execute(query);
			}
		});

		console.log('Successfully reset database');
	} catch (e) {
		console.error(e);
		process.exit(1);
	}
};

reset();
