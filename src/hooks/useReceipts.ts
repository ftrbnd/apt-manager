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

	const sortedReceipts = receipts?.sort((a, b) => a.month - b.month);

	const { mutateAsync, isPending } = useMutation({
		mutationFn: createReceipt,
		onMutate: async (body) => {
			await queryClient.cancelQueries({
				queryKey: [RECEIPTS],
			});

			const previousReceipts = queryClient.getQueryData<Receipt[]>([RECEIPTS]);

			if (previousReceipts && body.apartment) {
				const newReceipts: Receipt[] = body.apartment.rent.map((value) => {
					return {
						id: Math.random(),
						apartmentId: body.apartment?.id ?? Math.random(),
						month: new Date().getMonth(),
						year: new Date().getFullYear(),
						value,
						tenant: body.apartment?.tenant ?? 'Tenant',
						paymentMethod: body.apartment?.paymentMethod ?? 'OTHER',
						createdAt: new Date().toLocaleDateString(),
					};
				});

				queryClient.setQueryData<Receipt[]>(
					[RECEIPTS],
					[...previousReceipts, ...newReceipts]
				);
			}

			return { previousReceipts };
		},
		onError: (_err, _variables, context) => {
			if (context?.previousReceipts) {
				queryClient.setQueryData<Receipt[]>(
					[RECEIPTS],
					context.previousReceipts
				);
			}
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
