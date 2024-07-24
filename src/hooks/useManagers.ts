import { Manager } from '@/lib/drizzle/schema';
import {
	acceptManager,
	deleteManager,
	getManagerById,
	getManagers,
	createManager,
} from '@/services/managers';
import { useUser } from '@clerk/nextjs';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const MANAGERS = 'managers';

export function useManagers(id?: string) {
	const queryClient = useQueryClient();
	const { user } = useUser();

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

			const previousManagers = queryClient.getQueryData<Manager[]>([MANAGERS]);

			if (previousManagers) {
				const tempManager = {
					...newManager,
					id: Math.random(),
					approved: false,
				} as Manager;

				queryClient.setQueryData<Manager[]>(
					[MANAGERS],
					[...previousManagers, tempManager]
				);
			}

			return { previousManagers };
		},
		onError: (_err, _variables, context) => {
			if (context?.previousManagers) {
				queryClient.setQueryData<Manager[]>(
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
				queryKey: [MANAGERS, manager.id],
			});

			const previousManager = queryClient.getQueryData<Manager>([
				MANAGERS,
				manager.id,
			]);

			const updatedManager: Manager = { ...manager, approved: true };

			if (previousManager) {
				queryClient.setQueryData<Manager>(
					[MANAGERS, manager.id],
					updatedManager
				);
			}

			return { previousManager, updatedManager };
		},
		onError: (_err, _variables, context) => {
			if (context?.previousManager) {
				queryClient.setQueryData<Manager>(
					[MANAGERS, context.previousManager.id],
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

			const previousManagers = queryClient.getQueryData<Manager[]>([MANAGERS]);

			if (previousManagers && managerId) {
				const updatedManagers = previousManagers.filter(
					(manager) => manager.id !== managerId
				);

				queryClient.setQueryData<Manager[]>([MANAGERS], updatedManagers);
			}

			return { previousManagers };
		},
		onError: (_err, _variables, context) => {
			if (context?.previousManagers) {
				queryClient.setQueryData<Manager[]>(
					[MANAGERS],
					context.previousManagers
				);
			}
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: [MANAGERS, id] });
		},
	});

	const me = managers?.find((m) => m.clerkUserId === user?.id);

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
