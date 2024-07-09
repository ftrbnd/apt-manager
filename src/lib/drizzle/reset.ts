import { db } from './db';
import { buildings, apartments, receipts } from './schema';

export const reset = async () => {
	try {
		await db.delete(buildings);
		await db.delete(apartments);
		await db.delete(receipts);

		console.log('Successfully reset database');
	} catch (e) {
		console.error(e);
		process.exit(1);
	}
};

reset();
