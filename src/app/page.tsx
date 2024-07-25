import { ManagersCard } from '@/components/ManagersCard';
import { MonthlyRent } from '@/components/Receipt/MonthlyRent';

export default function Page() {
	return (
		<div className='flex flex-col w-full min-h-screen'>
			<main className='flex flex-col flex-1 gap-4 p-4 md:gap-8 md:p-8 bg-muted/40'>
				<h2 className='self-center pb-2 text-3xl font-semibold tracking-tight border-b scroll-m-20 first:mt-0 w-min'>
					Dashboard
				</h2>

				<div className='grid items-start justify-center w-full grid-cols-1 gap-8 md:grid-cols-2 '>
					<MonthlyRent />
					<ManagersCard />
				</div>
			</main>
		</div>
	);
}
