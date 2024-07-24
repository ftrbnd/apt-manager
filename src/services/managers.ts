import { Manager, NewManager } from '@/lib/drizzle/schema';

const MANAGERS = '/api/managers';

export const getManagers = async () => {
	try {
		const res = await fetch(MANAGERS);
		if (!res.ok) throw new Error('Failed to get managers');

		const { managers }: { managers: Manager[] } = await res.json();
		return managers;
	} catch (e) {
		console.error(e);
		throw e;
	}
};

export const getManagerById = async (id?: string | null) => {
	try {
		if (!id) throw new Error('Manager id is required');

		const res = await fetch(`${MANAGERS}/${id}`);
		if (!res.ok) throw new Error(`Failed to get manager with id ${id}`);

		const { manager }: { manager: Manager } = await res.json();
		return manager;
	} catch (e) {
		console.error(e);
		throw e;
	}
};

export const createManager = async (newManager: NewManager) => {
	try {
		const res = await fetch(`${MANAGERS}`, {
			method: 'POST',
			body: JSON.stringify({ manager: newManager }),
		});
		if (!res.ok) throw new Error('Failed to create manager');

		const { manager }: { manager: Manager } = await res.json();
		return manager;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

export const acceptManager = async (manager: Manager) => {
	try {
		if (!manager) throw new Error('Manager body is required');

		const res = await fetch(`${MANAGERS}/${manager.id}`, {
			method: 'PATCH',
		});
		if (!res.ok)
			throw new Error(`Failed to accept manager with id ${manager.id}`);

		const { manager: updatedManager }: { manager: Manager } = await res.json();
		return updatedManager;
	} catch (e) {
		console.error(e);
		throw e;
	}
};

export const deleteManager = async (id?: number) => {
	try {
		if (!id) throw new Error('Manager id is required');

		const res = await fetch(`${MANAGERS}/${id}`, {
			method: 'DELETE',
		});
		if (!res.ok) throw new Error(`Failed to delete manager with id ${id}`);
	} catch (e) {
		console.error(e);
		throw e;
	}
};
