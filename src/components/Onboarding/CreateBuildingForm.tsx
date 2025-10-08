import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { z } from 'zod/v4';
import { NewBuilding } from '@/lib/drizzle/schema/buildings';

const formSchema = z.object({
	landlord: z.string().trim().min(1, { message: 'Required' }),
	street: z.string().trim().min(1, { message: 'Required' }),
	city: z.string().trim().min(1, { message: 'Required' }),
	state: z.string().trim().min(1, { message: 'Required' }),
	zipCode: z.string().trim().min(1, { message: 'Required' }),
});

interface Props {
	onSubmit: (values: NewBuilding) => void;
}

export function CreateBuildingForm({ onSubmit }: Props) {
	const form = useForm<NewBuilding>({
		resolver: zodResolver(formSchema),
	});

	return (
		<Form {...form}>
			<form
				id='building-form'
				onSubmit={form.handleSubmit(onSubmit)}
				className='space-y-2'>
				<FormField
					control={form.control}
					name='landlord'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Landlord</FormLabel>
							<FormControl>
								<Input
									placeholder='Mark Walter'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='street'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Street</FormLabel>
							<FormControl>
								<Input
									placeholder='1000 Vin Scully Ave'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='city'
					render={({ field }) => (
						<FormItem>
							<FormLabel>City</FormLabel>
							<FormControl>
								<Input
									placeholder='Los Angeles'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='state'
					render={({ field }) => (
						<FormItem>
							<FormLabel>State</FormLabel>
							<FormControl>
								<Input
									placeholder='California'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='zipCode'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Zip code</FormLabel>
							<FormControl>
								<Input
									placeholder='90012'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</form>
		</Form>
	);
}
