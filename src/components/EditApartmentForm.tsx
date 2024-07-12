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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Apartment } from '@/lib/drizzle/schema';

const formSchema = z.object({
	rent: z.number().array(),
	tenant: z.string(),
	paymentMethod: z.enum(['CHECK', 'MONEY ORDER', 'OTHER'], {
		required_error: 'You need to select a payment method type.',
	}),
});

interface Props {
	apartment: Apartment;
}

export function EditApartmentForm({ apartment }: Props) {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			rent: apartment.rent,
			tenant: apartment.tenant,
			paymentMethod: apartment.paymentMethod,
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		console.log(values);
	}

	return (
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
								The apartment's monthly rent, split by check
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
										<FormLabel className='font-normal'>Money order</FormLabel>
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
	);
}
