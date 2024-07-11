'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import { getApartmentById } from '@/services/apartments';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const formSchema = z.object({
	rent: z.number().array(),
	tenant: z.string(),
	paymentMethod: z.enum(['CHECK', 'MONEY ORDER', 'OTHER'], {
		required_error: 'You need to select a payment method type.',
	}),
});

interface Params {
	buildingId: string;
	apartmentId: string;
}

export default function Page({ params }: { params: Params }) {
	console.log(params);

	const { data: apartment } = useQuery({
		queryKey: ['apartments', params.apartmentId],
		queryFn: () => getApartmentById(params.apartmentId),
	});

	// 1. Define your form.
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			rent: apartment?.rent ?? [0],
			tenant: apartment?.tenant ?? '',
			paymentMethod: apartment?.paymentMethod ?? 'CHECK',
		},
	});

	// 2. Define a submit handler.
	function onSubmit(values: z.infer<typeof formSchema>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		console.log(values);
	}

	return (
		<div className='flex min-h-screen w-full flex-col items-center justify-center bg-muted/40'>
			<Card className='w-[350px]'>
				<CardHeader>
					<CardTitle>Edit apartment</CardTitle>
					<CardDescription>Apartment #{apartment?.id}</CardDescription>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className='space-y-8'>
							<FormField
								control={form.control}
								name='rent'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Rent</FormLabel>
										<FormControl>
											{/* TODO: implement number array-compatible input*/}
										</FormControl>
										<FormDescription>
											The apartment's monthly rent
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='tenant'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Tenant</FormLabel>
										<FormControl>
											<Input
												placeholder='John Doe'
												{...field}
											/>
										</FormControl>
										<FormDescription>
											The tenant's first and last name
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='paymentMethod'
								render={({ field }) => (
									<FormItem className='space-y-3'>
										<FormLabel>Payment method</FormLabel>
										<FormControl>
											<RadioGroup
												onValueChange={field.onChange}
												defaultValue={field.value}
												className='flex flex-col space-y-1'>
												<FormItem className='flex items-center space-x-3 space-y-0'>
													<FormControl>
														<RadioGroupItem value='CHECK' />
													</FormControl>
													<FormLabel className='font-normal'>Check</FormLabel>
												</FormItem>
												<FormItem className='flex items-center space-x-3 space-y-0'>
													<FormControl>
														<RadioGroupItem value='MONEY ORDER' />
													</FormControl>
													<FormLabel className='font-normal'>
														Money order
													</FormLabel>
												</FormItem>
												<FormItem className='flex items-center space-x-3 space-y-0'>
													<FormControl>
														<RadioGroupItem value='OTHER' />
													</FormControl>
													<FormLabel className='font-normal'>Other</FormLabel>
												</FormItem>
											</RadioGroup>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<Button type='submit'>Submit</Button>
						</form>
					</Form>
				</CardContent>
			</Card>
		</div>
	);
}
