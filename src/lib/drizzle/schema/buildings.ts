import { pgTable, text } from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';

export const buildings = pgTable('buildings', {
	id: text('id').primaryKey(),
	landlord: text('landlord').notNull(),
	street: text('street').notNull(),
	city: text('city').notNull(),
	state: text('state').notNull(),
	zipCode: text('zip_code').notNull(),
});
export type Building = typeof buildings.$inferSelect;

export const insertBuildingSchema = createInsertSchema(buildings);
export type NewBuilding = z.infer<typeof insertBuildingSchema>;
