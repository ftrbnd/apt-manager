import { Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { CreateApartmentForm } from './CreateApartmentForm';

interface Props {
	buildingEmpty: boolean;
}

export function CreateApartmentButton({ buildingEmpty }: Props) {
	const [showForm, setShowForm] = useState(false);

	return (
		<div className='flex flex-col gap-4 justify-between p-4 border rounded-md'>
			<div className='flex items-center justify-between space-x-2'>
				{buildingEmpty && (
					<p className='text-muted-foreground'>No apartments registered.</p>
				)}
				<Button
					className='text-xs'
					variant={showForm ? 'secondary' : 'default'}
					onClick={() => setShowForm((prev) => !prev)}>
					{showForm ? (
						<Minus className='w-4 h-4 mr-2' />
					) : (
						<Plus className='w-4 h-4 mr-2' />
					)}
					New
				</Button>
			</div>
			{showForm && <CreateApartmentForm />}
		</div>
	);
}
