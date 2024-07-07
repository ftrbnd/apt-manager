import { db } from './db';
import { apartments, landlords, receipts } from './schema.js';

const main = async () => {
	try {
		await db.delete(apartments);
		await db.delete(landlords);
		await db.delete(receipts);

		console.log('Successfully reset database');
	} catch (e) {
		console.error(e);
		process.exit(1);
	}
};

main();
