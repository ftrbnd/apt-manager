import { pgEnum, pgTable, real, text } from 'drizzle-orm/pg-core';
import { createSelectSchema, createInsertSchema } from 'drizzle-zod';
import { z } from 'zod/v4';
import { buildings } from './buildings';

const paymentMethodEnum = pgEnum('payment_method', [
	'CHECK',
	'MONEY ORDER',
	'OTHER',
]);

export const apartments = pgTable('apartments', {
	id: text('id').primaryKey(),
	number: text('number').notNull(),
	rent: real('rent').array().notNull(),
	tenant: text('tenant').notNull(),
	paymentMethod: paymentMethodEnum('payment_methods').notNull(),
	note: text('note'),
	buildingId: text('building_id')
		.notNull()
		.references(() => buildings.id, { onDelete: 'cascade' }),
});
export type Apartment = typeof apartments.$inferSelect;

export const selectApartmentSchema = createSelectSchema(apartments);
export const insertApartmentSchema = createInsertSchema(apartments);
export type NewApartment = z.infer<typeof insertApartmentSchema>;
