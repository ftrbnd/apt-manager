import { ApartmentsTable } from '@/components/Apartment/ApartmentsTable';

export default function Dashboard() {
	return (
		<div className='flex w-full flex-col min-h-screen'>
			<main className='flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 bg-muted/40'>
				<ApartmentsTable />
			</main>
		</div>
	);
}
