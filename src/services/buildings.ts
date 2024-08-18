import { Building, NewBuilding } from '@/lib/drizzle/schema';
import { generateId } from 'lucia';

const BUILDINGS = '/api/buildings';

export const getBuildings = async () => {
	try {
		const res = await fetch(BUILDINGS);
		if (!res.ok) throw new Error('Failed to get buildings');

		const { buildings }: { buildings: Building[] } = await res.json();
		return buildings;
	} catch (e) {
		console.error(e);
		throw e;
	}
};

export const getBuildingById = async (id?: string | null) => {
	try {
		if (!id) throw new Error('Building id is required');

		const res = await fetch(`${BUILDINGS}/${id}`);
		if (!res.ok) throw new Error(`Failed to get building with id ${id}`);

		const { building }: { building: Building } = await res.json();
		return building;
	} catch (e) {
		console.error(e);
		throw e;
	}
};

export const createBuilding = async (newBuilding: NewBuilding) => {
	try {
		const res = await fetch(`${BUILDINGS}`, {
			method: 'POST',
			body: JSON.stringify({
				building: { ...newBuilding, id: generateId(15) },
			}),
		});
		if (!res.ok) throw new Error(`Failed to create new building`);

		const { building }: { building: Building } = await res.json();
		return building;
	} catch (e) {
		console.error(e);
		throw e;
	}
};
