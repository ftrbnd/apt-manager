import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
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
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Apartment } from '@/lib/drizzle/schema';
import { RentFieldArray } from './RentFieldArray';
import { updateApartment } from '@/actions';
import { toast } from 'sonner';

const formSchema = z.object({
	rent: z
		.object({ value: z.number() })
		.array()
		.min(1, 'At least one value is required.'),
	tenant: z.string(),
	paymentMethod: z.enum(['CHECK', 'MONEY ORDER', 'OTHER'], {
		required_error: 'You need to select a payment method type.',
	}),
});

export type FormValues = z.infer<typeof formSchema>;

interface Props {
	apartment: Apartment;
	close: () => void;
}

export function EditApartmentForm({ apartment, close }: Props) {
	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			// useFieldArray only accepts objects
			rent: apartment.rent.map((v) => {
				return { value: v };
			}),
			tenant: apartment.tenant,
			paymentMethod: apartment.paymentMethod,
		},
	});

	const onSubmit: SubmitHandler<FormValues> = async (values: FormValues) => {
		try {
			const newValues = {
				...values,
				rent: values.rent.map((r) => r.value),
			};

			const newApartment: Apartment = {
				...apartment,
				...newValues,
			};

			await updateApartment(newApartment);
			toast.success(`Successfully updated Apartment #${apartment.id}`);
			close();
		} catch (e) {
			if (e instanceof Error)
				toast.error(`Failed to update Apartment #${apartment.id}`, {
					description: e.message,
				});
			console.error(e);
		}
	};

	return (
		<Card className='w-full h-full'>
			<CardHeader>
				<CardTitle>Edit apartment</CardTitle>
				<CardDescription>Apartment #{apartment.id}</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className='space-y-8'>
						<RentFieldArray
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
						<div className='flex gap-2'>
							<Button
								variant='secondary'
								type='button'
								onClick={close}>
								Cancel
							</Button>
							<Button type='submit'>Submit</Button>
						</div>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}
