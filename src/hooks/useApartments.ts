import {
	getApartmentById,
	getApartments,
	updateApartment,
} from '@/services/apartments';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

const APARTMENTS = 'apartments';

export function useApartments(id?: string) {
	const queryClient = useQueryClient();

	const { data: apartments, isLoading: apartmentsLoading } = useQuery({
		queryKey: [APARTMENTS],
		queryFn: getApartments,
	});

	const { data: apartment, isLoading: apartmentLoading } = useQuery({
		queryKey: [APARTMENTS, id],
		queryFn: () => getApartmentById(id),
		enabled: id !== undefined,
	});

	const sortedApartments = apartments?.sort((a, b) => a.id - b.id);

	const { mutateAsync } = useMutation({
		mutationFn: updateApartment,
		onMutate: async (newApartment) => {
			await queryClient.cancelQueries({
				queryKey: [APARTMENTS, newApartment.id],
			});

			const previousApartment = queryClient.getQueryData([
				APARTMENTS,
				newApartment.id,
			]);

			if (previousApartment) {
				queryClient.setQueryData([APARTMENTS, newApartment.id], newApartment);
			}

			return { previousApartment, newApartment };
		},
		onError: (error, newApartment) => {
			toast.error(`Failed to update Apartment #${newApartment.id}`, {
				description: error.message,
			});
		},
		onSuccess: (newApartment) => {
			toast.success(`Successfully updated Apartment #${newApartment.id}`);
		},
		onSettled: () => {
			queryClient.invalidateQueries({
				queryKey: [APARTMENTS, id],
			});
		},
	});

	return {
		apartments: sortedApartments ?? [],
		apartmentsLoading,
		apartment,
		apartmentLoading,
		update: mutateAsync,
	};
}
