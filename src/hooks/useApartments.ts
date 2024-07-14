import { getApartmentById, getApartments } from '@/services/apartments';
import { useQuery } from '@tanstack/react-query';

export function useApartments(id?: string) {
	const { data: apartments, isLoading: apartmentsLoading } = useQuery({
		queryKey: ['apartments'],
		queryFn: getApartments,
	});

	const { data: apartment, isLoading: apartmentLoading } = useQuery({
		queryKey: ['apartments', id],
		queryFn: () => getApartmentById(id),
		enabled: id !== undefined,
	});

	const sortedApartments = apartments?.sort((a, b) => a.id - b.id);

	return {
		apartments: sortedApartments,
		apartmentsLoading,
		apartment,
		apartmentLoading,
	};
}
