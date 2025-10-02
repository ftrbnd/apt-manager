import { Apartment } from '@/lib/drizzle/schema/apartments';

const APARTMENTS = '/api/apartments';

export const getApartments = async () => {
	const res = await fetch(APARTMENTS);
	if (!res.ok) throw new Error('Failed to get apartments');

	const { apartments }: { apartments: Apartment[] } = await res.json();
	return apartments;
};

export const getApartmentById = async (id?: string | null) => {
	if (!id) throw new Error('Apartment id is required');

	const res = await fetch(`${APARTMENTS}/${id}`);
	if (!res.ok) throw new Error(`Failed to get apartment with id ${id}`);

	const { apartment }: { apartment: Apartment } = await res.json();
	return apartment;
};
