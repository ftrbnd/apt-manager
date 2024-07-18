'use client';

import { ReactNode } from 'react';
import { useTheme } from 'next-themes';
import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';

export function AuthProvider({ children }: { children: ReactNode }) {
	const { resolvedTheme } = useTheme();

	return (
		<ClerkProvider
			appearance={{ baseTheme: resolvedTheme === 'dark' ? dark : undefined }}>
			{children}
		</ClerkProvider>
	);
}
