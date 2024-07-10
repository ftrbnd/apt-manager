import { Apartment } from '@/lib/drizzle/schema';

export const getApartments = async () => {
	try {
		const res = await fetch('/api/apartments');
		if (!res.ok) throw new Error('Failed to get apartments');

		const { apartments }: { apartments: Apartment[] } = await res.json();
		return apartments;
	} catch (e) {
		console.error(e);
		throw e;
	}
};
