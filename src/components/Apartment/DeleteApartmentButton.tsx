import { useApartments } from '@/hooks/useApartments';
import {
	AlertDialog,
	AlertDialogTrigger,
	AlertDialogContent,
	AlertDialogTitle,
	AlertDialogDescription,
	AlertDialogCancel,
	AlertDialogAction,
} from '@/components/ui/alert-dialog';
import { Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import {
	AlertDialogHeader,
	AlertDialogFooter,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Apartment } from '@/lib/drizzle/schema/apartments';

interface Props {
	apartment: Apartment;
}

export function DeleteApartmentButton({ apartment }: Props) {
	const { remove } = useApartments(apartment.id.toString());
	const router = useRouter();

	const handleDelete = async () => {
		const promise = () => remove(apartment);

		toast.promise(promise, {
			loading: 'Deleting apartment...',
			success: `Deleted Apartment #${apartment.number}`,
			error: `Failed to delete Apartment #${apartment.number}`,
		});

		router.replace('/apartments');
	};

	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button
					className='justify-self-end'
					variant='destructive'>
					<Trash className='w-4 h-4 mr-2' />
					Delete
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
					<AlertDialogDescription>
						This will permanently delete the apartment and their receipts from
						our servers.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction asChild>
						<Button
							// variant="destructive" doesn't change the color
							className='bg-destructive text-destructive-foreground hover:bg-destructive/90'
							onClick={handleDelete}>
							Continue
						</Button>
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
