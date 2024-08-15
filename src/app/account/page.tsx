import { Footer } from '@/components/Layout/Footer';
import { getUser } from '@/lib/auth/actions';

export default async function Home() {
	const user = await getUser();
	console.log(user);

	return (
		<div className='flex p-4 flex-col items-center md:justify-center w-full min-h-screen bg-muted/40'>
			<div>TODO: USER PROFILE</div>
			<Footer />
		</div>
	);
}
