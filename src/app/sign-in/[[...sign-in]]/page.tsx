import { Footer } from '@/components/Layout/Footer';
import { SignIn } from '@clerk/nextjs';

export default function Page() {
	return (
		<div className='flex flex-col items-center justify-center w-full min-h-screen bg-muted/40'>
			<SignIn />
			<Footer />
		</div>
	);
}
