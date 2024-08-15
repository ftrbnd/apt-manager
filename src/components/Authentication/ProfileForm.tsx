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

const formSchema = z.object({
	firstName: z.string().trim().min(1, 'Required'),
	lastName: z.string().trim().min(1, 'Required'),
	email: z.string().trim().min(1, 'Required'),
});
type FormValues = z.infer<typeof formSchema>;

export function ProfileForm() {
	const { user } = useAuth();

	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			firstName: user?.firstName ?? undefined,
			lastName: user?.lastName ?? undefined,
			email: user?.email ?? undefined,
		},
	});

	function onSubmit(values: FormValues) {
		console.log('TODO: submit handler');
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle>Profile details</CardTitle>
			</CardHeader>
			<CardContent>
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
