import { AuthContext } from '@/providers/AuthProvider';
import { useContext } from 'react';

export function useAuth() {
	const context = useContext(AuthContext);
	if (process.env.NODE_ENV !== 'production' && !context) {
		throw new Error('useAuth must be wrapped in a <AuthProvider />');
	}

	return context;
}
