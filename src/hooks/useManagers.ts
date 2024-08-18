import { Manager, ManagerWithBuilding } from '@/lib/drizzle/schema';
import {
	acceptManager,
	deleteManager,
	getManagerById,
	getManagers,
	createManager,
} from '@/services/managers';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/hooks/useAuth';

const MANAGERS = 'managers';

export function useManagers(id?: string) {
	const queryClient = useQueryClient();
	const { user } = useAuth();

	const { data: managers, isLoading: managersLoading } = useQuery({
		queryKey: [MANAGERS],
		queryFn: getManagers,
	});

	const { data: manager } = useQuery({
		queryKey: [MANAGERS, id],
		queryFn: () => getManagerById(id),
		enabled: id !== undefined,
	});

	const { mutateAsync: create } = useMutation({
		mutationFn: createManager,
		onMutate: async (newManager) => {
			await queryClient.cancelQueries({
				queryKey: [MANAGERS],
			});

			const previousManagers = queryClient.getQueryData<ManagerWithBuilding[]>([
				MANAGERS,
			]);

			if (previousManagers) {
				const tempManager = {
					user: {
						...newManager,
					},
					managers_buildings: { approved: true },
				} as ManagerWithBuilding;

				queryClient.setQueryData<ManagerWithBuilding[]>(
					[MANAGERS],
					[...previousManagers, tempManager]
				);
			}

			return { previousManagers };
		},
		onError: (_err, _variables, context) => {
			if (context?.previousManagers) {
				queryClient.setQueryData<ManagerWithBuilding[]>(
					[MANAGERS],
					context.previousManagers
				);
			}
		},
		onSettled: () => {
			queryClient.invalidateQueries({
				queryKey: [MANAGERS],
			});
		},
	});

	const { mutateAsync: accept } = useMutation({
		mutationFn: acceptManager,
		onMutate: async (manager) => {
			await queryClient.cancelQueries({
				queryKey: [MANAGERS, manager.user.id],
			});

			const previousManager = queryClient.getQueryData<ManagerWithBuilding>([
				MANAGERS,
				manager.user.id,
			]);

			const updatedManager: ManagerWithBuilding = {
				...manager,
				managers_buildings: { ...manager.managers_buildings, approved: true },
			};

			if (previousManager) {
				queryClient.setQueryData<ManagerWithBuilding>(
					[MANAGERS, manager.user.id],
					updatedManager
				);
			}

			return { previousManager, updatedManager };
		},
		onError: (_err, _variables, context) => {
			if (context?.previousManager) {
				queryClient.setQueryData<ManagerWithBuilding>(
					[MANAGERS, context.previousManager.user.id],
					context.previousManager
				);
			}
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: [MANAGERS, id] });
		},
	});

	const { mutateAsync: remove } = useMutation({
		mutationFn: deleteManager,
		onMutate: async (managerId) => {
			await queryClient.cancelQueries({
				queryKey: [MANAGERS],
			});

			const previousManagers = queryClient.getQueryData<ManagerWithBuilding[]>([
				MANAGERS,
			]);

			if (previousManagers && managerId) {
				const updatedManagers = previousManagers.filter(
					(manager) => manager.user.id !== managerId
				);

				queryClient.setQueryData<ManagerWithBuilding[]>(
					[MANAGERS],
					updatedManagers
				);
			}

			return { previousManagers };
		},
		onError: (_err, _variables, context) => {
			if (context?.previousManagers) {
				queryClient.setQueryData<ManagerWithBuilding[]>(
					[MANAGERS],
					context.previousManagers
				);
			}
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: [MANAGERS, id] });
		},
	});

	const me = managers?.find((m) => m.user.id === user?.id);

	return {
		managers,
		managersLoading,
		manager,
		create,
		accept,
		remove,
		me,
	};
}
