import { Apartment, NewApartment } from '@/lib/drizzle/schema';

const APARTMENTS = '/api/apartments';

export const createApartment = async (apartment: NewApartment) => {
	try {
		const res = await fetch(`${APARTMENTS}`, {
			method: 'POST',
			body: JSON.stringify({ apartment }),
		});
		if (!res.ok) throw new Error('Failed to create new apartment');

		const { apartment: createdApartment }: { apartment: Apartment } =
			await res.json();
		return createdApartment;
	} catch (e) {
		console.error(e);
		throw e;
	}
};

export const getApartments = async () => {
	try {
		const res = await fetch(APARTMENTS);
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

		const res = await fetch(`${APARTMENTS}/${id}`);
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

		const res = await fetch(`${APARTMENTS}/${apartment.id}`, {
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

export const deleteApartment = async (id?: number) => {
	try {
		if (!id) throw new Error('Apartment id is required');

		const res = await fetch(`${APARTMENTS}/${id}`, {
			method: 'DELETE',
		});
		if (!res.ok) throw new Error(`Failed to delete apartment with id ${id}`);
	} catch (e) {
		console.error(e);
		throw e;
	}
};
