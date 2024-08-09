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
import { EditRentFieldArray } from './EditRentFieldArray';
import { useApartments } from '@/hooks/useApartments';
import { PencilOff, Save } from 'lucide-react';
import { toast } from 'sonner';
import { DeleteApartmentButton } from './DeleteApartmentButton';
import { Textarea } from '@/components/ui/textarea';

const editApartmentSchema = z.object({
	rent: z
		.object({ value: z.number().positive() })
		.array()
		.min(1, 'At least one value greater than 0 is required.'),
	tenant: z.string(),
	paymentMethod: z.enum(['CHECK', 'MONEY ORDER', 'OTHER'], {
		required_error: 'You need to select a payment method type.',
	}),
	note: z.string().trim().optional(),
});

export type EditedApartment = z.infer<typeof editApartmentSchema>;

interface Props {
	apartment: Apartment;
	close: () => void;
}

export function EditApartmentForm({ apartment, close }: Props) {
	const { update } = useApartments(apartment.id.toString());

	const form = useForm<EditedApartment>({
		resolver: zodResolver(editApartmentSchema),
		defaultValues: {
			// useFieldArray only accepts objects
			rent: apartment.rent.map((v) => {
				return { value: v };
			}),
			tenant: apartment.tenant,
			paymentMethod: apartment.paymentMethod,
			note: apartment.note ?? undefined,
		},
	});

	const handleEdit: SubmitHandler<EditedApartment> = async (
		values: EditedApartment
	) => {
		const newApartment: Apartment = {
			...apartment,
			...values,
			rent: values.rent.map((r) => r.value).filter((v) => v > 0),
			tenant: values.tenant.trim(),
		};

		if (JSON.stringify(newApartment) !== JSON.stringify(apartment)) {
			const promise = () => update(newApartment);

			toast.promise(promise, {
				loading: 'Updating apartment...',
				success: `Updated Apartment #${apartment.number}`,
				error: `Failed to update Apartment #${apartment.number}`,
			});
		}

		close();
	};

	return (
		<Card className='w-full h-full'>
			<CardHeader>
				<CardTitle>Edit apartment</CardTitle>
				<CardDescription>Apartment #{apartment.number}</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(handleEdit)}
						className='space-y-8'>
						<EditRentFieldArray
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
						<FormField
							control={form.control}
							name='note'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Note</FormLabel>
									<FormControl>
										<Textarea
											placeholder='...'
											className='resize-none'
											{...field}
										/>
									</FormControl>
									<FormDescription>
										{'Extra information regarding this unit'}
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className='flex justify-between items-center gap-2'>
							<Button
								variant='secondary'
								type='button'
								onClick={close}>
								<PencilOff className='w-4 h-4 mr-2' />
								Cancel
							</Button>
							<div className='grid grid-cols-2 gap-2'>
								<DeleteApartmentButton apartment={apartment} />
								<Button type='submit'>
									<Save className='w-4 h-4 mr-2' />
									Save
								</Button>
							</div>
						</div>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}
