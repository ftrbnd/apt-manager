'use client';

import { useApartments } from '@/hooks/useApartments';

interface Params {
	apartmentId: string;
}

export default function Page({ params }: { params: Params }) {
	const { apartment } = useApartments(params.apartmentId);

	return (
		<div>
			<h1>Receipts</h1>
			receipts for apartment #{apartment?.number}
		</div>
	);
}
