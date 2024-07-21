import { ManagerRequest } from '@/lib/drizzle/schema';
import {
	acceptManagerRequest,
	deleteManagerRequest,
	getManagerRequestById,
	getManagerRequests,
	sendManagerRequest,
} from '@/services/managerRequests';
import { useUser } from '@clerk/nextjs';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const MANAGER_REQUESTS = 'manager_requests';

export function useManagerRequests(id?: string) {
	const queryClient = useQueryClient();
	const { user } = useUser();

	const { data: managerRequests, isLoading: requestsLoading } = useQuery({
		queryKey: [MANAGER_REQUESTS],
		queryFn: getManagerRequests,
	});

	const { data: managerRequest } = useQuery({
		queryKey: [MANAGER_REQUESTS, id],
		queryFn: () => getManagerRequestById(id),
		enabled: id !== undefined,
	});

	const { mutateAsync: sendRequest } = useMutation({
		mutationFn: sendManagerRequest,
		onMutate: async (newRequest) => {
			await queryClient.cancelQueries({
				queryKey: [MANAGER_REQUESTS],
			});

			const previousRequests = queryClient.getQueryData<ManagerRequest[]>([
				MANAGER_REQUESTS,
			]);

			if (previousRequests) {
				const tempRequest = {
					...newRequest,
					id: Math.random(),
					approved: false,
				} as ManagerRequest;

				queryClient.setQueryData<ManagerRequest[]>(
					[MANAGER_REQUESTS],
					[...previousRequests, tempRequest]
				);
			}

			return { previousRequests };
		},
		onError: (_err, _variables, context) => {
			if (context?.previousRequests) {
				queryClient.setQueryData<ManagerRequest[]>(
					[MANAGER_REQUESTS],
					context.previousRequests
				);
			}
		},
		onSettled: () => {
			queryClient.invalidateQueries({
				queryKey: [MANAGER_REQUESTS],
			});
		},
	});

	const { mutateAsync: acceptRequest } = useMutation({
		mutationFn: acceptManagerRequest,
		onMutate: async (request) => {
			await queryClient.cancelQueries({
				queryKey: [MANAGER_REQUESTS, request.id],
			});

			const previousRequest = queryClient.getQueryData<ManagerRequest>([
				MANAGER_REQUESTS,
				request.id,
			]);

			const updatedRequest: ManagerRequest = { ...request, approved: true };

			if (previousRequest) {
				queryClient.setQueryData<ManagerRequest>(
					[MANAGER_REQUESTS, request.id],
					updatedRequest
				);
			}

			return { previousRequest, updatedRequest };
		},
		onError: (_err, _variables, context) => {
			if (context?.previousRequest) {
				queryClient.setQueryData<ManagerRequest>(
					[MANAGER_REQUESTS, context.previousRequest.id],
					context.previousRequest
				);
			}
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: [MANAGER_REQUESTS, id] });
		},
	});

	const { mutateAsync: undoRequest } = useMutation({
		mutationFn: deleteManagerRequest,
		onMutate: async (requestId) => {
			await queryClient.cancelQueries({
				queryKey: [MANAGER_REQUESTS],
			});

			const previousRequests = queryClient.getQueryData<ManagerRequest[]>([
				MANAGER_REQUESTS,
			]);

			if (previousRequests && requestId) {
				const updatedRequests = previousRequests.filter(
					(request) => request.id !== requestId
				);

				queryClient.setQueryData<ManagerRequest[]>(
					[MANAGER_REQUESTS],
					updatedRequests
				);
			}

			return { previousRequests };
		},
		onError: (_err, _variables, context) => {
			if (context?.previousRequests) {
				queryClient.setQueryData<ManagerRequest[]>(
					[MANAGER_REQUESTS],
					context.previousRequests
				);
			}
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: [MANAGER_REQUESTS, id] });
		},
	});

	const userSentRequest = managerRequests?.some(
		(request) => request.clerkUserId === user?.id
	);

	const requestFromUser = managerRequests?.find(
		(request) => request.clerkUserId === user?.id
	);

	return {
		managerRequests,
		requestsLoading,
		managerRequest,
		sendRequest,
		acceptRequest,
		undoRequest,
		userSentRequest,
		requestFromUser,
	};
}
