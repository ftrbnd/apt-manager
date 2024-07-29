import {
	Apartment,
	insertApartmentSchema,
	NewApartment,
} from '@/lib/drizzle/schema';
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
import { useApartments } from '@/hooks/useApartments';
import { toast } from 'sonner';
import { useBuildings } from '@/hooks/useBuildings';

const createApartmentSchema = insertApartmentSchema.extend({
	rent: z
		.object({ value: z.number() })
		.array()
		.min(1, 'At least one value is required.'),
	number: z.string().trim().min(1, 'Required'),
	tenant: z.string().trim().min(1, 'Required'),
});

export type CreatedApartment = z.infer<typeof createApartmentSchema>;

export function CreateApartmentForm() {
	const { create } = useApartments();
	const { myBuilding } = useBuildings();

	const form = useForm<CreatedApartment>({
		resolver: zodResolver(createApartmentSchema),
	});

	const onSubmit = async (apartment: CreatedApartment) => {
		if (!myBuilding) toast.error('A building is required');

		const newApartment: NewApartment = {
			...apartment,
			buildingId: myBuilding?.id,
			rent: apartment.rent.map((r) => r.value).filter((v) => v > 0),
		};

		const withoutId = insertApartmentSchema
			.omit({ id: true })
			.parse(newApartment);

		const promise = () => create(withoutId);

		toast.promise(promise, {
			loading: 'Creating apartment...',
			success: `Created Apartment #${newApartment.number}`,
			error: `Failed to create Apartment #${newApartment.number}`,
		});
	};

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
