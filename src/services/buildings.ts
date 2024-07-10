import { Building } from '@/lib/drizzle/schema';

export const getBuildings = async () => {
	try {
		const res = await fetch('/api/buildings');
		if (!res.ok) throw new Error('Failed to get buildings');

		const { buildings }: { buildings: Building[] } = await res.json();
		return buildings;
	} catch (e) {
		console.error(e);
		throw e;
	}
};
