import { Footer } from '@/components/Layout/Footer';
import { SignIn } from '@clerk/nextjs';

export default function Page() {
	return (
		<div className='flex p-4 flex-col items-center md:justify-center w-full min-h-screen bg-muted/40'>
			<SignIn />
			<Footer />
		</div>
	);
}
