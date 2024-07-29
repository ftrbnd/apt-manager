import { Footer } from '@/components/Layout/Footer';
import { SignUp } from '@clerk/nextjs';

export default function Page() {
	return (
		<div className='flex p-4 flex-col items-center md:justify-center w-full min-h-screen bg-muted/40'>
			<SignUp />
			<Footer />
		</div>
	);
}
