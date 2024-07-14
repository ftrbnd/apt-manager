import { getBuildingById, getBuildings } from '@/services/buildings';
import { useQuery } from '@tanstack/react-query';

export function useBuildings(id?: string | number) {
	const { data: buildings } = useQuery({
		queryKey: ['buildings'],
		queryFn: getBuildings,
	});

	const {
		data: building,
		isLoading: buildingLoading,
		isPending: buildingPending,
	} = useQuery({
		queryKey: ['buildings', id],
		queryFn: () =>
			getBuildingById(typeof id === 'string' ? id : id?.toString()),
		enabled: id !== undefined,
	});

	return {
		buildings,
		building,
		buildingLoading,
		buildingPending,
	};
}
