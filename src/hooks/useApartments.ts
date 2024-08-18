import { Apartment } from '@/lib/drizzle/schema';
import {
	createApartment,
	deleteApartment,
	getApartmentById,
	getApartments,
	updateApartment,
} from '@/services/apartments';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useBuildings } from './useBuildings';

const APARTMENTS = 'apartments';

export function useApartments(id?: string) {
	const queryClient = useQueryClient();
	const { myBuilding } = useBuildings();

	const { data: apartments, isLoading: apartmentsLoading } = useQuery({
		queryKey: [APARTMENTS],
		queryFn: getApartments,
	});

	const { data: apartment, isLoading: apartmentLoading } = useQuery({
		queryKey: [APARTMENTS, id],
		queryFn: () => getApartmentById(id),
		enabled: id !== undefined,
	});

	const sortedApartments = apartments
		?.filter((a) => a.buildingId === myBuilding?.id)
		.sort((a, b) => parseInt(a.id) - parseInt(b.id));

	const { mutateAsync: create } = useMutation({
		mutationFn: createApartment,
		onMutate: async (newApartment) => {
			await queryClient.cancelQueries({
				queryKey: [APARTMENTS],
			});

			const previousApartments = queryClient.getQueryData<Apartment[]>([
				APARTMENTS,
			]);

			if (previousApartments) {
				const tempApartment: Apartment = {
					...newApartment,
					id: Math.random().toString(),
					buildingId: Math.random().toString(),
					note: null,
				};

				queryClient.setQueryData<Apartment[]>(
					[APARTMENTS],
					[...previousApartments, tempApartment]
				);
			}

			return { previousApartments, newApartment };
		},
		onError: (_err, _variables, context) => {
			if (context?.previousApartments) {
				queryClient.setQueryData<Apartment[]>(
					[APARTMENTS],
					context.previousApartments
				);
			}
		},
		onSettled: () => {
			queryClient.invalidateQueries({
				queryKey: [APARTMENTS],
			});
		},
	});

	const { mutateAsync: update } = useMutation({
		mutationFn: updateApartment,
		onMutate: async (newApartment) => {
			await queryClient.cancelQueries({
				queryKey: [APARTMENTS, newApartment.id],
			});

			const previousApartment = queryClient.getQueryData<Apartment>([
				APARTMENTS,
				newApartment.id,
			]);

			if (previousApartment) {
				queryClient.setQueryData<Apartment>(
					[APARTMENTS, newApartment.id],
					newApartment
				);
			}

			return { previousApartment, newApartment };
		},
		onError: (_err, _variables, context) => {
			if (context?.previousApartment) {
				queryClient.setQueryData<Apartment>(
					[APARTMENTS, context.previousApartment.id],
					context.previousApartment
				);
			}
		},
		onSettled: () => {
			queryClient.invalidateQueries({
				queryKey: [APARTMENTS, id],
			});
		},
	});

	const { mutateAsync: remove } = useMutation({
		mutationFn: deleteApartment,
		onMutate: async (apartmentId) => {
			await queryClient.cancelQueries({
				queryKey: [APARTMENTS],
			});

			const previousApartments = queryClient.getQueryData<Apartment[]>([
				APARTMENTS,
			]);

			if (previousApartments) {
				const filteredApartments = previousApartments.filter(
					(apt) => apt.id !== apartmentId
				);

				queryClient.setQueryData<Apartment[]>([APARTMENTS], filteredApartments);
			}

			return { previousApartments };
		},
		onError: (_err, _variables, context) => {
			if (context?.previousApartments) {
				queryClient.setQueryData<Apartment[]>(
					[APARTMENTS],
					context.previousApartments
				);
			}
		},
		onSettled: () => {
			queryClient.invalidateQueries({
				queryKey: [APARTMENTS],
			});
		},
	});

	return {
		apartments: sortedApartments ?? [],
		apartmentsLoading,
		apartment,
		apartmentLoading,
		create,
		update,
		remove,
	};
}
