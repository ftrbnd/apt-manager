import { Receipt } from '@/lib/drizzle/schema';
import {
	createReceipt,
	getReceiptById,
	getReceipts,
} from '@/services/receipts';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const RECEIPTS = 'receipts';

export function useReceipts(id?: string) {
	const queryClient = useQueryClient();

	const { data: receipts, isLoading: receiptsLoading } = useQuery({
		queryKey: [RECEIPTS],
		queryFn: getReceipts,
	});

	const { data: receipt, isLoading: receiptLoading } = useQuery({
		queryKey: [RECEIPTS, id],
		queryFn: () => getReceiptById(id),
		enabled: id !== undefined,
	});

	const sortedReceipts = receipts?.sort((a, b) => {
		const aDate = new Date(a.date).getTime();
		const bDate = new Date(b.date).getTime();

		return aDate - bDate;
	});

	const { mutateAsync, isPending } = useMutation({
		mutationFn: createReceipt,
		onMutate: async (apartment) => {
			await queryClient.cancelQueries({
				queryKey: [RECEIPTS],
			});

			const previousReceipts = queryClient.getQueryData<Receipt[]>([RECEIPTS]);

			if (previousReceipts) {
				queryClient.setQueryData<Receipt[]>(
					[RECEIPTS],
					[
						...previousReceipts,
						{
							id: Math.random(),
							apartmentId: parseInt(apartment?.id.toString() ?? ''),
							date: new Date().toLocaleDateString(),
						},
					]
				);
			}

			return { previousReceipts };
		},
		onSettled: () => {
			queryClient.invalidateQueries({
				queryKey: [RECEIPTS],
			});
		},
	});

	return {
		receipts: sortedReceipts ?? [],
		receiptsLoading,
		receipt,
		receiptLoading,
		create: mutateAsync,
		createPending: isPending,
	};
}
