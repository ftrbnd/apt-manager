'use client';

import {
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectItem,
} from '@/components/ui/select';
import { useBuildings } from '@/hooks/useBuildings';

interface Props {
	setBuildingId: (id: string) => void;
}

export const BuildingSelect = ({ setBuildingId }: Props) => {
	const { buildings } = useBuildings();

	return (
		<Select onValueChange={(id) => setBuildingId(id)}>
			<SelectTrigger>
				<SelectValue placeholder='Choose' />
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
