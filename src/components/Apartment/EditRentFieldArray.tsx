import {
	useFieldArray,
	Control,
	UseFormRegister,
	FieldErrors,
} from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FormDescription, FormLabel } from '@/components/ui/form';
import { EditedApartment } from './EditApartmentForm';
import { Minus, Plus } from 'lucide-react';

interface Props {
	control: Control<EditedApartment, any>;
	register: UseFormRegister<EditedApartment>;
	errors?: FieldErrors<EditedApartment>;
}

export function EditRentFieldArray({ control, register, errors }: Props) {
	const { fields, append, remove } = useFieldArray({
		control,
		name: 'rent',
		rules: {
			minLength: 1,
		},
	});

	return (
		<div className='flex flex-col gap-2'>
			<FormLabel className={errors?.rent && 'text-destructive'}>Rent</FormLabel>
			<ul className='flex flex-col gap-4'>
				{fields.map((field, index) => (
					<li
						key={field.id}
						className='flex items-center gap-2'>
						<Input
							type='number'
							step='.01'
							{...register(`rent.${index}.value` as const, {
								valueAsNumber: true,
								minLength: 1,
							})}
						/>

						<Button
							type='button'
							variant='destructive'
							onClick={() => remove(index)}>
							<Minus className='w-4 h-4 mr-2' />
							Remove
						</Button>
					</li>
				))}
			</ul>
			<Button
				className='self-start w-full sm:w-min'
				type='button'
				variant='secondary'
				onClick={() => {
					append({ value: 0 });
				}}>
				<Plus className='w-4 h-4 mr-2' />
				Add
			</Button>

			<FormDescription>
				{"The apartment's monthly rent, split by check"}
			</FormDescription>
			{errors?.rent && (
				<p className='text-sm font-medium text-destructive'>
					At least one value greater than 0 is required.
				</p>
			)}
		</div>
	);
}
