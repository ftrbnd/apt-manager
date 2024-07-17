import {
	useFieldArray,
	Control,
	UseFormRegister,
	FieldErrors,
} from 'react-hook-form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { FormDescription, FormLabel } from '../ui/form';
import { FormValues } from './EditApartmentForm';
import { Minus, Plus } from 'lucide-react';

interface Props {
	control: Control<FormValues, any>;
	register: UseFormRegister<FormValues>;
	errors?: FieldErrors<FormValues>;
}

export function RentFieldArray({ control, register, errors }: Props) {
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
							onClick={() => remove(index)}>
							<Minus className='mr-2 h-4 w-4' />
							Remove
						</Button>
					</li>
				))}
			</ul>
			<Button
				className='w-full sm:w-min self-start'
				type='button'
				onClick={() => {
					append({ value: 0 });
				}}>
				<Plus className='mr-2 h-4 w-4' />
				Add
			</Button>

			<FormDescription>
				The apartment's monthly rent, split by check
			</FormDescription>
			{errors?.rent && (
				<p className='text-sm font-medium text-destructive'>
					At least one value is required.
				</p>
			)}
		</div>
	);
}
