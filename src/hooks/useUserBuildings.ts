import {
	createUserBuilding,
	deleteUserBuilding,
	updateUserBuilding,
} from '@/actions/users_buildings';
import { UserBuilding } from '@/lib/drizzle/schema/users_buildings';
import { getUserBuildings } from '@/services/users_buildings';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuth } from './useAuth';

const USERS_BUILDINGS = 'users_buildings';

export function useUserBuildings() {
	const queryClient = useQueryClient();
	const { user } = useAuth();

	const { data: userBuildings, isLoading: userBuildingsLoading } = useQuery({
		queryKey: [USERS_BUILDINGS],
		queryFn: getUserBuildings,
	});

	const myUserBuilding = userBuildings?.find(
		(user_building) => user_building.userId === user?.id
	);

	const { mutateAsync: create } = useMutation({
		mutationFn: createUserBuilding,
		onMutate: async (newUserBuilding) => {
			await queryClient.cancelQueries({
				queryKey: [USERS_BUILDINGS],
			});

			const previousUserBuildings = queryClient.getQueryData<UserBuilding[]>([
				USERS_BUILDINGS,
			]);

			if (previousUserBuildings) {
				queryClient.setQueryData<UserBuilding[]>(
					[USERS_BUILDINGS],
					[...previousUserBuildings, newUserBuilding as UserBuilding]
				);
			}

			return { previousUserBuildings };
		},
		onError: (_err, _variables, context) => {
			if (context?.previousUserBuildings) {
				queryClient.setQueryData<UserBuilding[]>(
					[USERS_BUILDINGS],
					context.previousUserBuildings
				);
			}
		},
		onSettled: () => {
			queryClient.invalidateQueries({
				queryKey: [USERS_BUILDINGS],
			});
		},
	});

	const { mutateAsync: update } = useMutation({
		mutationFn: updateUserBuilding,
		onMutate: async (userBuilding) => {
			await queryClient.cancelQueries({
				queryKey: [USERS_BUILDINGS, userBuilding.id],
			});

			const previousUser = queryClient.getQueryData<UserBuilding>([
				USERS_BUILDINGS,
				userBuilding.id,
			]);

			if (previousUser) {
				queryClient.setQueryData<UserBuilding>(
					[USERS_BUILDINGS, userBuilding.id],
					userBuilding
				);
			}

			return { previousUser, userBuilding };
		},
		onError: (_err, _variables, context) => {
			if (context?.previousUser) {
				queryClient.setQueryData<UserBuilding>(
					[USERS_BUILDINGS, context.previousUser.id],
					context.previousUser
				);
			}
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: [USERS_BUILDINGS] });
		},
	});

	const { mutateAsync: remove } = useMutation({
		mutationFn: deleteUserBuilding,
		onMutate: async (userBuilding) => {
			await queryClient.cancelQueries({
				queryKey: [USERS_BUILDINGS],
			});

			const previousUserBuildings = queryClient.getQueryData<UserBuilding[]>([
				USERS_BUILDINGS,
			]);

			if (previousUserBuildings) {
				const filteredApartments = previousUserBuildings.filter(
					(ub) => ub.id !== userBuilding?.id
				);

				queryClient.setQueryData<UserBuilding[]>(
					[USERS_BUILDINGS],
					filteredApartments
				);
			}

			return { previousUserBuildings };
		},
		onError: (_err, _variables, context) => {
			if (context?.previousUserBuildings) {
				queryClient.setQueryData<UserBuilding[]>(
					[USERS_BUILDINGS],
					context.previousUserBuildings
				);
			}
		},
		onSettled: () => {
			queryClient.invalidateQueries({
				queryKey: [USERS_BUILDINGS],
			});
		},
	});

	return {
		userBuildings,
		userBuildingsLoading,
		myUserBuilding,
		create,
		update,
		remove,
	};
}
