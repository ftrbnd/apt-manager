import { User } from '@/lib/drizzle/schema/users';

const USERS = '/api/users';

export const getUsers = async () => {
	const res = await fetch(USERS);
	if (!res.ok) throw new Error('Failed to get users');

	const { users }: { users: User[] } = await res.json();
	return users;
};

export const getUserById = async (id?: string | null) => {
	if (!id) throw new Error('User id is required');

	const res = await fetch(`${USERS}/${id}`);
	if (!res.ok) throw new Error(`Failed to get user with id ${id}`);

	const { user }: { user: User } = await res.json();
	return user;
};
