import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import Providers from '@/providers';
import { Header } from '@/components/Header';
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
		<Providers>
			<html lang='en'>
				<body
					className={cn(
						'min-h-screen bg-background font-sans antialiased',
						fontSans.variable
					)}>
					<Header />
					{children}
					<Toaster richColors />
				</body>
			</html>
		</Providers>
	);
}
