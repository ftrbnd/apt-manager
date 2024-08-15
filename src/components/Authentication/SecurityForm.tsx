import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

export function SecurityForm() {
	const deleteAccount = async () => {
		console.log('TODO: delete account');
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle>Security</CardTitle>
			</CardHeader>
			<CardContent>
				<div className='flex justify-between items-center gap-4'>
					<p className='text-sm text-muted-foreground'>Delete account</p>
					<AlertDialog>
						<AlertDialogTrigger asChild>
							<Button variant='destructive'>Delete account</Button>
						</AlertDialogTrigger>
						<AlertDialogContent>
							<AlertDialogHeader>
								<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
								<AlertDialogDescription>
									Are you sure you want to delete your account?
									<span className='text-destructive'>
										{' '}
										This action is permanent and irreversible.
									</span>
								</AlertDialogDescription>
							</AlertDialogHeader>
							<AlertDialogFooter>
								<AlertDialogCancel>Cancel</AlertDialogCancel>
								<AlertDialogAction asChild>
									<Button
										className='bg-destructive text-destructive-foreground hover:bg-destructive/90'
										onClick={deleteAccount}>
										Delete account
									</Button>
								</AlertDialogAction>
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialog>
				</div>
			</CardContent>
		</Card>
	);
}