import { date, numeric, pgTable, serial, text } from 'drizzle-orm/pg-core';

export const apartments = pgTable('apartments', {
	id: serial('id').primaryKey(),
	number: numeric('number').notNull().unique(),
	rent: numeric('rent').notNull(),
	tenant: text('tenant').notNull(),
	paymentMethod: text('payment_method').notNull(),
	landlordId: serial('landlord_id')
		.notNull()
		.references(() => landlords.id, { onDelete: 'cascade' }),
});

export const landlords = pgTable('landlords', {
	id: serial('id').primaryKey(),
	name: text('name'),
});

export const receipts = pgTable('receipts', {
	id: serial('id').primaryKey(),
	date: date('date').notNull(),
	apartmentId: serial('apartment_id')
		.notNull()
		.references(() => apartments.id, { onDelete: 'cascade' }),
});

export type Apartment = typeof apartments.$inferSelect;
export type Landlord = typeof landlords.$inferSelect;
export type Receipt = typeof receipts.$inferSelect;
