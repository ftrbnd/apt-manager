import { SignUp } from '@clerk/nextjs';

export default function Page() {
	return (
		<div className='flex min-h-screen w-full flex-col items-center justify-center bg-muted/40'>
			<SignUp />
		</div>
	);
}
