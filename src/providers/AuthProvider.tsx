'use client';

import { createContext, ReactNode, useEffect, useState } from 'react';
import { User } from 'lucia';
import { deleteUser, getUser, signOut, updateUser } from '@/actions/auth';
import { UserFormValues } from '@/components/Authentication/ProfileForm';

interface AuthContextProps {
	user: User | null;
	signOut: () => Promise<{ error: string | null }>;
	update: (values: UserFormValues) => Promise<User | null>;
	deleteAccount: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextProps>({
	user: null,
	signOut: async () => {
		return {
			error: null,
		};
	},
	update: async () => {
		return null;
	},
	deleteAccount: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		getUser().then((user) => setUser(user));
	}, []);

	const update = async (values: UserFormValues) => {
		const newUser = await updateUser(values);

		setUser(newUser);
		return newUser;
	};

	const deleteAccount = async () => {
		await deleteUser();
		setUser(null);
	};

	return (
		<AuthContext.Provider value={{ user, signOut, update, deleteAccount }}>
			{children}
		</AuthContext.Provider>
	);
}
