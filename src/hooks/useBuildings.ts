import { getBuildingById, getBuildings } from '@/services/buildings';
import { useQuery } from '@tanstack/react-query';
import { useManagerRequests } from './useManagerRequests';

const BUILDINGS = 'buildings';

export function useBuildings(id?: string | number) {
	const { myRequest } = useManagerRequests();

	const { data: buildings } = useQuery({
		queryKey: [BUILDINGS],
		queryFn: getBuildings,
	});

	const myBuilding = buildings?.find((b) => b.id === myRequest?.buildingId);

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
