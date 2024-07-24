import { getBuildingById, getBuildings } from '@/services/buildings';
import { useQuery } from '@tanstack/react-query';
import { useManagers } from './useManagers';

const BUILDINGS = 'buildings';

export function useBuildings(id?: string | number) {
	const { me } = useManagers();

	const { data: buildings } = useQuery({
		queryKey: [BUILDINGS],
		queryFn: getBuildings,
	});

	const myBuilding = buildings?.find((b) => b.id === me?.buildingId);

	const {
		data: building,
		isLoading: buildingLoading,
		isPending: buildingPending,
	} = useQuery({
		queryKey: [BUILDINGS, id],
		queryFn: () =>
			getBuildingById(typeof id === 'string' ? id : id?.toString()),
		enabled: id !== undefined,
	});

	return {
		buildings: buildings ?? [],
		building,
		myBuilding,
		buildingLoading,
		buildingPending,
	};
}
