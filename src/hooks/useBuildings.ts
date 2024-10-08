import { getBuildingById, getBuildings } from '@/services/buildings';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Building } from '@/lib/drizzle/schema/buildings';
import { createBuilding } from '@/actions/buildings';
import { useUserBuildings } from './useUserBuildings';

const BUILDINGS = 'buildings';

export function useBuildings(id?: string | null) {
	const queryClient = useQueryClient();
	const { myUserBuilding } = useUserBuildings();

	const {
		data: buildings,
		isLoading: buildingsLoading,
		isPending: buildingsPending,
	} = useQuery({
		queryKey: [BUILDINGS],
		queryFn: getBuildings,
	});

	const {
		data: building,
		isLoading: buildingLoading,
		isPending: buildingPending,
	} = useQuery({
		queryKey: [BUILDINGS, id],
		queryFn: () => getBuildingById(id),
		enabled: id !== undefined,
	});

	const { mutateAsync: create } = useMutation({
		mutationFn: createBuilding,
		onMutate: async (newBuilding) => {
			await queryClient.cancelQueries({
				queryKey: [BUILDINGS],
			});

			const previousBuildings = queryClient.getQueryData<Building[]>([
				BUILDINGS,
			]);

			if (previousBuildings) {
				const tempBuilding: Building = {
					...newBuilding,
					id: Math.random().toString(),
				};

				queryClient.setQueryData<Building[]>(
					[BUILDINGS],
					[...previousBuildings, tempBuilding]
				);
			}

			return { previousBuildings };
		},
		onError: (_err, _variables, context) => {
			if (context?.previousBuildings) {
				queryClient.setQueryData<Building[]>(
					[BUILDINGS],
					context.previousBuildings
				);
			}
		},
		onSettled: () => {
			queryClient.invalidateQueries({
				queryKey: [BUILDINGS],
			});
		},
	});

	const myBuilding = buildings?.find(
		(b) => b.id === myUserBuilding?.buildingId
	);

	return {
		buildings: buildings ?? [],
		buildingLoading,
		buildingPending,
		building,
		buildingsLoading,
		buildingsPending,
		myBuilding,
		create,
	};
}
