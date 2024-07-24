import { Footer } from '@/components/Footer';
import { UserProfile } from '@clerk/nextjs';

export default function Home() {
	return (
		<div className='flex flex-col items-center justify-center w-full min-h-screen bg-muted/40'>
			<UserProfile />
			<Footer />
		</div>
	);
}
