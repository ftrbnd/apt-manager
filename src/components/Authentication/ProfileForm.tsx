'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { useAuth } from '@/hooks/useAuth';
import { Save } from 'lucide-react';
import { toast } from 'sonner';

const formSchema = z.object({
	firstName: z.string().trim().min(1, 'Required'),
	lastName: z.string().trim().min(1, 'Required'),
	email: z.string().trim().min(1, 'Required'),
});

export type UserFormValues = z.infer<typeof formSchema>;

interface Props {
	showHeader?: boolean;
}

export function ProfileForm({ showHeader = true }: Props) {
	const { user, update } = useAuth();

	const form = useForm<UserFormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			firstName: user?.firstName ?? undefined,
			lastName: user?.lastName ?? undefined,
			email: user?.email ?? undefined,
		},
	});

	const onSubmit = async (values: UserFormValues) => {
		const promise = () => update(values);

		toast.promise(promise, {
			loading: 'Updating profile...',
			success: (user) => {
				return `Thank you ${user?.firstName}!`;
			},
			error: 'Failed to update your profile',
		});
	};

	return (
		<Card>
			{showHeader && (
				<CardHeader>
					<CardTitle>Profile details</CardTitle>
				</CardHeader>
			)}
			<CardContent className={showHeader ? '' : 'pt-6'}>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className='space-y-8'>
						<FormField
							control={form.control}
							name='firstName'
							render={({ field }) => (
								<FormItem>
									<FormLabel>First name</FormLabel>
									<FormControl>
										<Input
											placeholder='John'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='lastName'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Last name</FormLabel>
									<FormControl>
										<Input
											placeholder='Doe'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='email'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input
											placeholder='johndoe@example.com'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button type='submit'>
							<Save className='w-4 h-4 mr-2' />
							Save
						</Button>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}
