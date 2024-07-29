import { Footer } from '@/components/Layout/Footer';
import { UserProfile } from '@clerk/nextjs';

export default function Home() {
	return (
		<div className='flex p-4 flex-col items-center md:justify-center w-full min-h-screen bg-muted/40'>
			<UserProfile />
			<Footer />
		</div>
	);
}
