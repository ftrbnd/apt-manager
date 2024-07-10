import { userIsManager } from '@/actions';
import { Button } from '@/components/ui/button';

export default async function Home() {
	const isManager = await userIsManager();

	return (
		<main>
			{isManager ? <p>you are a manager</p> : <Button>Rent Receipts</Button>}
		</main>
	);
}
