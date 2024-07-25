import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import Providers from '@/providers';
import { Header } from '@/components/Layout/Header';
import { Toaster } from '@/components/ui/sonner';

const fontSans = FontSans({
	subsets: ['latin'],
	variable: '--font-sans',
});

export const metadata: Metadata = {
	title: 'Rent Receipts',
	description: 'Manage monthly rent receipts',
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
