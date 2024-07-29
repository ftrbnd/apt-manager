import { insertApartmentSchema } from '@/lib/drizzle/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { CreateRentFieldArray } from './CreateRentFieldArray';
import { z } from 'zod';

const newApartmentSchema = insertApartmentSchema.extend({
	rent: z
		.object({ value: z.number() })
		.array()
		.min(1, 'At least one value is required.'),
	number: z.string().trim().min(1, 'Required'),
	tenant: z.string().trim().min(1, 'Required'),
});

export type NewApartment = z.infer<typeof newApartmentSchema>;

export function CreateApartmentForm() {
	const form = useForm<NewApartment>({
		resolver: zodResolver(newApartmentSchema),
	});

	function onSubmit(values: NewApartment) {
		console.log(values);
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='space-y-8'>
				<FormField
					control={form.control}
					name='number'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Apartment number</FormLabel>
							<FormControl>
								<Input
									placeholder='12'
									{...field}
								/>
							</FormControl>
							<FormDescription>{"The apartment unit's number"}</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<CreateRentFieldArray
					control={form.control}
					register={form.register}
					errors={form.formState.errors}
				/>
				<FormField
					control={form.control}
					name='tenant'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Tenant</FormLabel>
							<FormControl>
								<Input
									placeholder='Jane Doe'
									{...field}
								/>
							</FormControl>
							<FormDescription>
								{"The tenant's first and last name"}
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
