import { User } from '@/lib/drizzle/schema/users';
import { getUserById, getUsers } from '@/services/users';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/hooks/useAuth';
import { createUser, deleteUser, updateUser } from '@/actions/users';

const USERS = 'users';

export function useUsers(id?: string) {
	const queryClient = useQueryClient();
	const { user: me } = useAuth();

	const { data: users, isLoading: usersLoading } = useQuery({
		queryKey: [USERS],
		queryFn: getUsers,
	});

	const { data: user } = useQuery({
		queryKey: [USERS, id],
		queryFn: () => getUserById(id),
		enabled: id !== undefined,
	});

	const { mutateAsync: create } = useMutation({
		mutationFn: createUser,
		onMutate: async (newUser) => {
			await queryClient.cancelQueries({
				queryKey: [USERS],
			});

			const previousUsers = queryClient.getQueryData<User[]>([USERS]);

			if (previousUsers) {
				const tempUser = newUser as User;

				queryClient.setQueryData<User[]>([USERS], [...previousUsers, tempUser]);
			}

			return { previousUsers };
		},
		onError: (_err, _variables, context) => {
			if (context?.previousUsers) {
				queryClient.setQueryData<User[]>([USERS], context.previousUsers);
			}
		},
		onSettled: () => {
			queryClient.invalidateQueries({
				queryKey: [USERS],
			});
		},
	});

	const { mutateAsync: accept } = useMutation({
		mutationFn: updateUser,
		onMutate: async (user) => {
			await queryClient.cancelQueries({
				queryKey: [USERS, user.id],
			});

			const previousUser = queryClient.getQueryData<User>([USERS, user.id]);

			if (previousUser) {
				queryClient.setQueryData<User>([USERS, user.id], user);
			}

			return { previousUser, user };
		},
		onError: (_err, _variables, context) => {
			if (context?.previousUser) {
				queryClient.setQueryData<User>(
					[USERS, context.previousUser.id],
					context.previousUser
				);
			}
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: [USERS, id] });
		},
	});

	const { mutateAsync: remove } = useMutation({
		mutationFn: deleteUser,
		onMutate: async (user) => {
			await queryClient.cancelQueries({
				queryKey: [USERS],
			});

			const previousUsers = queryClient.getQueryData<User[]>([USERS]);

			if (previousUsers && user) {
				const updatedUsers = previousUsers.filter((u) => u.id !== user.id);

				queryClient.setQueryData<User[]>([USERS], updatedUsers);
			}

			return { previousUsers };
		},
		onError: (_err, _variables, context) => {
			if (context?.previousUsers) {
				queryClient.setQueryData<User[]>([USERS], context.previousUsers);
			}
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: [USERS, id] });
		},
	});

	return {
		users,
		usersLoading,
		user,
		create,
		accept,
		remove,
		me,
	};
}
