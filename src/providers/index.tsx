'use client';

import { ReactNode, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from './ThemeProvider';
import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import { useTheme } from 'next-themes';
import { AuthProvider } from './AuthProvider';

export default function Providers({ children }: { children: ReactNode }) {
	const [queryClient] = useState(() => new QueryClient());

	const { resolvedTheme } = useTheme();

	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider
				attribute='class'
				defaultTheme='system'
				enableSystem
				disableTransitionOnChange>
				<ClerkProvider
					appearance={{
						baseTheme: resolvedTheme === 'dark' ? dark : undefined,
					}}>
					<AuthProvider>{children}</AuthProvider>
				</ClerkProvider>
			</ThemeProvider>
		</QueryClientProvider>
	);
}
