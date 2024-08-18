import { db } from '@/lib/drizzle/db';
import {
	insertManagerBuildingSchema,
	insertManagerSchema,
	managers,
	managersBuildings,
} from '@/lib/drizzle/schema';
import { eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic'; // defaults to auto

export async function GET() {
	try {
		const allManagers = await db
			.select()
			.from(managers)
			.innerJoin(
				managersBuildings,
				eq(managers.id, managersBuildings.managerId)
			);

		return NextResponse.json({ managers: allManagers }, { status: 200 });
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 });
	}
}

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		const pairing = insertManagerBuildingSchema.parse(body);

		const [manager] = await db
			.insert(managersBuildings)
			.values(pairing)
			.returning();
		const [managerBuilding] = await db
			.select()
			.from(managers)
			.where(eq(managersBuildings.managerId, manager.id))
			.innerJoin(
				managersBuildings,
				eq(managers.id, managersBuildings.managerId)
			);

		return NextResponse.json({ manager: managerBuilding }, { status: 200 });
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 });
	}
}
