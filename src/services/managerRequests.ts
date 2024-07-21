import { ManagerRequest, NewManagerRequest } from '@/lib/drizzle/schema';

const MANAGER_REQUESTS = '/api/manager_requests';

export const getManagerRequests = async () => {
	try {
		const res = await fetch(MANAGER_REQUESTS);
		if (!res.ok) throw new Error('Failed to get manager_requests');

		const { managerRequests }: { managerRequests: ManagerRequest[] } =
			await res.json();
		return managerRequests;
	} catch (e) {
		console.error(e);
		throw e;
	}
};

export const getManagerRequestById = async (id?: string | null) => {
	try {
		if (!id) throw new Error('Manager request id is required');

		const res = await fetch(`${MANAGER_REQUESTS}/${id}`);
		if (!res.ok) throw new Error(`Failed to get manager request with id ${id}`);

		const { managerRequest }: { managerRequest: ManagerRequest } =
			await res.json();
		return managerRequest;
	} catch (e) {
		console.error(e);
		throw e;
	}
};

export const sendManagerRequest = async (newRequest: NewManagerRequest) => {
	try {
		const res = await fetch(`${MANAGER_REQUESTS}`, {
			method: 'POST',
			body: JSON.stringify({ managerRequest: newRequest }),
		});
		if (!res.ok) throw new Error('Failed to send manager request');

		const { managerRequest }: { managerRequest: ManagerRequest } =
			await res.json();
		return managerRequest;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

export const acceptManagerRequest = async (managerRequest: ManagerRequest) => {
	try {
		if (!managerRequest) throw new Error('Manager request body is required');

		const res = await fetch(`${MANAGER_REQUESTS}/${managerRequest.id}`, {
			method: 'PATCH',
		});
		if (!res.ok)
			throw new Error(
				`Failed to accept manager request with id ${managerRequest.id}`
			);

		const {
			managerRequest: updatedRequest,
		}: { managerRequest: ManagerRequest } = await res.json();
		return updatedRequest;
	} catch (e) {
		console.error(e);
		throw e;
	}
};

export const deleteManagerRequest = async (id?: number) => {
	try {
		if (!id) throw new Error('Manager request id is required');

		const res = await fetch(`${MANAGER_REQUESTS}/${id}`, {
			method: 'DELETE',
		});
		if (!res.ok)
			throw new Error(`Failed to delete manager request with id ${id}`);
	} catch (e) {
		console.error(e);
		throw e;
	}
};
