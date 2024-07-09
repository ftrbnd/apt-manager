import { date, pgEnum, pgTable, serial, text } from 'drizzle-orm/pg-core';

export const paymentMethodEnum = pgEnum('payment_method', [
	'CHECK',
	'MONEY ORDER',
	'OTHER',
]);

export const buildings = pgTable('buildings', {
	id: serial('id').primaryKey(),
	landlord: text('landlord').notNull(),
	street: text('street').notNull(),
	city: text('city').notNull(),
	state: text('state').notNull(),
	zipCode: text('zip_code').notNull(),
});

export const apartments = pgTable('apartments', {
	id: serial('id').primaryKey(),
	rent: text('rent').$type<number[]>().notNull(),
	tenant: text('tenant').notNull(),
	paymentMethod: paymentMethodEnum('payment_methods').notNull(),
	buildingId: serial('building_id')
		.notNull()
		.references(() => buildings.id, { onDelete: 'cascade' }),
});

export const receipts = pgTable('receipts', {
	id: serial('id').primaryKey(),
	date: date('date').notNull(),
	apartmentId: serial('apartment_id')
		.notNull()
		.references(() => apartments.id, { onDelete: 'cascade' }),
});

export type Building = typeof buildings.$inferSelect;
export type Apartment = typeof apartments.$inferSelect;
export type Receipt = typeof receipts.$inferSelect;
