import { Building } from '@/lib/drizzle/schema/buildings';

const BUILDINGS = '/api/buildings';

export const getBuildings = async () => {
	const res = await fetch(BUILDINGS);
	if (!res.ok) throw new Error('Failed to get buildings');

	const { buildings }: { buildings: Building[] } = await res.json();
	return buildings;
};

export const getBuildingById = async (id?: string | null) => {
	if (!id) throw new Error('Building id is required');

	const res = await fetch(`${BUILDINGS}/${id}`);
	if (!res.ok) throw new Error(`Failed to get building with id ${id}`);

	const { building }: { building: Building } = await res.json();
	return building;
};
