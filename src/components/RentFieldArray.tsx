import { useFieldArray, Control, UseFormRegister } from 'react-hook-form';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { FormDescription, FormLabel, FormMessage } from './ui/form';
import { FormValues } from './EditApartmentForm';

interface Props {
	control: Control<FormValues, any>;
	register: UseFormRegister<FormValues>;
}

export function RentFieldArray({ control, register }: Props) {
	const { fields, append, remove } = useFieldArray({
		control,
		name: 'rent',
		rules: {
			minLength: 1,
		},
	});

	return (
		<div className='flex flex-col gap-2'>
			<FormLabel>Rent</FormLabel>
			<ul className='flex flex-col gap-4'>
				{fields.map((field, index) => (
					<li
						key={field.id}
						className='flex justify-between items-center gap-2'>
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
							Remove
						</Button>
					</li>
				))}
			</ul>
			<FormDescription>
				The apartment's monthly rent, split by check
			</FormDescription>
			<FormMessage />

			<Button
				type='button'
				onClick={() => {
					append({ value: 0 });
				}}>
				Add
			</Button>
		</div>
	);
}
