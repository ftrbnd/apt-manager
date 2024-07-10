'use client';

import {
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectItem,
} from '@/components/ui/select';
import { Building } from '@/lib/drizzle/schema';

import { getBuildings } from '@/services/buildings';
import { useQuery } from '@tanstack/react-query';

interface Props {
	setBuildingId: (id: string) => void;
}

export const BuildingSelect = ({ setBuildingId }: Props) => {
	const { data: buildings, error: buildingsError } = useQuery({
		queryKey: ['buildings'],
		queryFn: getBuildings,
	});

	return (
		<Select onValueChange={(id) => setBuildingId(id)}>
			<SelectTrigger className='w-[180px]'>
				<SelectValue placeholder='Select your building' />
			</SelectTrigger>
			<SelectContent>
				{buildings?.map((b) => (
					<SelectItem
						key={b.id}
						value={b.id.toString()}>
						{b.street} ({b.city}, {b.state})
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
};
