'use client';

import { createContext, ReactNode, useEffect, useState } from 'react';
import { User } from 'lucia';
import { getUser, signOut } from '@/lib/auth/actions';

interface AuthContextProps {
	user: User | null;
	signOut: () => Promise<{ error: string | null }>;
}

export const AuthContext = createContext<AuthContextProps>({
	user: null,
	signOut: async () => {
		return {
			error: null,
		};
	},
});

export function AuthProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		getUser().then((user) => setUser(user));
	}, []);

	return (
		<AuthContext.Provider value={{ user, signOut }}>
			{children}
		</AuthContext.Provider>
	);
}
