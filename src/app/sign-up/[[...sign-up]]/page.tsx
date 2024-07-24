import { Footer } from '@/components/Footer';
import { SignUp } from '@clerk/nextjs';

export default function Page() {
	return (
		<div className='flex flex-col items-center justify-center w-full min-h-screen bg-muted/40'>
			<SignUp />
			<Footer />
		</div>
	);
}
