import { Login } from '@/components/Authentication/Login';
import { Footer } from '@/components/Layout/Footer';

export default function Page() {
	return (
		<div className='flex p-4 flex-col items-center md:justify-center w-full min-h-screen bg-muted/40'>
			<Login />
			<Footer />
		</div>
	);
}
