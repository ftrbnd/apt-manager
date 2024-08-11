'use client';

import { createContext, ReactNode } from 'react';
import { useAuth, useUser } from '@clerk/nextjs';

interface AuthContextProps {
	user: any | null;
	signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextProps>({
	user: null,
	signOut: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
	const { user } = useUser();
	const { signOut } = useAuth();

	return (
		<AuthContext.Provider value={{ user, signOut }}>
			{children}
		</AuthContext.Provider>
	);
}
