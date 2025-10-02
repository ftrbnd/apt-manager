import { boolean, pgTable, text } from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';
import { buildings } from './buildings';
import { users } from './users';

export const usersBuildings = pgTable('users_buildings', {
	id: text('id').primaryKey(),
	userId: text('user_id').references(() => users.id, {
		onDelete: 'cascade',
	}),
	buildingId: text('building_id').references(() => buildings.id, {
		onDelete: 'cascade',
	}),
	approved: boolean('approved').default(false),
});
export type UserBuilding = typeof usersBuildings.$inferSelect;

export const insertUserBuildingSchema = createInsertSchema(usersBuildings);
export type NewUserBuilding = z.infer<typeof insertUserBuildingSchema>;
