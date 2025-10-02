import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import Providers from '@/providers';
import { Header } from '@/components/Layout/Header';
import { Toaster } from '@/components/ui/sonner';
import { APP_NAME } from '@/lib/constants';

const fontSans = FontSans({
	subsets: ['latin'],
	variable: '--font-sans',
});

export const metadata: Metadata = {
	title: APP_NAME,
	description: "Manage your building's apartments",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body
				className={cn(
					'min-h-screen bg-background font-sans antialiased',
					fontSans.variable
				)}>
				<Providers>
					<Header />
					{children}
					<Toaster richColors />
				</Providers>
			</body>
		</html>
	);
}
