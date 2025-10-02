import { UserBuilding } from '@/lib/drizzle/schema/users_buildings';

const USERS_BUILDINGS = '/api/users_buildings';

export const getUserBuildings = async () => {
	const res = await fetch(USERS_BUILDINGS);
	if (!res.ok) throw new Error('Failed to get user-buildings');

	const { userBuildings }: { userBuildings: UserBuilding[] } = await res.json();
	return userBuildings;
};

export const getUserBuildingById = async (id?: string | null) => {
	if (!id) throw new Error('User id is required');

	const res = await fetch(`${USERS_BUILDINGS}/${id}`);
	if (!res.ok) throw new Error(`Failed to get user-building with id ${id}`);

	const { userBuilding }: { userBuilding: UserBuilding } = await res.json();
	return userBuilding;
};
