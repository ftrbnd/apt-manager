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

export const updateApartment = async (apartment: Apartment) => {
	try {
		if (!apartment) throw new Error('Apartment body is required');

		const res = await fetch(`/api/apartments/${apartment.id}`, {
			method: 'PATCH',
			body: JSON.stringify({ apartment }),
		});
		if (!res.ok)
			throw new Error(`Failed to update apartment with id ${apartment.id}`);

		const { apartment: newApartment }: { apartment: Apartment } =
			await res.json();
		return newApartment;
	} catch (e) {
		console.error(e);
		throw e;
	}
};
