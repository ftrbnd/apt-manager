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

export const getApartmentById = async (id?: string | null) => {
	try {
		if (!id) throw new Error('Apartment id is required');

		const res = await fetch(`/api/apartments/${id}`);
		if (!res.ok) throw new Error(`Failed to get apartment with id ${id}`);

		const { apartment }: { apartment: Apartment } = await res.json();
		return apartment;
	} catch (e) {
		console.error(e);
		throw e;
	}
};
