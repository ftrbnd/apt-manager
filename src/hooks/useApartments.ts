import {
	getApartmentById,
	getApartments,
	updateApartment,
} from '@/services/apartments';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export function useApartments(id?: string) {
	const queryClient = useQueryClient();

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

	const { mutateAsync } = useMutation({
		mutationFn: updateApartment,
		onMutate: async (newApartment) => {
			await queryClient.cancelQueries({
				queryKey: ['apartments', newApartment.id],
			});

			const previousApartment = queryClient.getQueryData([
				'apartments',
				newApartment.id,
			]);

			if (previousApartment) {
				queryClient.setQueryData(
					['apartments', newApartment.id],
					previousApartment
				);
			}

			return { previousApartment };
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
				queryKey: ['apartments', id],
			});
		},
	});

	return {
		apartments: sortedApartments,
		apartmentsLoading,
		apartment,
		apartmentLoading,
		update: mutateAsync,
	};
}
