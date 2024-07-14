import {
	date,
	doublePrecision,
	pgEnum,
	pgTable,
	real,
	serial,
	text,
} from 'drizzle-orm/pg-core';
import { createSelectSchema } from 'drizzle-zod';

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
	number: text('number').notNull(),
	rent: real('rent').array().notNull(),
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

export const managers = pgTable('managers', {
	id: text('id').primaryKey(),
});

export const buildingsToManagers = pgTable('buildings_managers', {
	id: serial('id').primaryKey(),
	managerId: text('manager_id').references(() => managers.id, {
		onDelete: 'cascade',
	}),
	buildingId: serial('building_id').references(() => buildings.id, {
		onDelete: 'cascade',
	}),
});

export const apartmentSchema = createSelectSchema(apartments);

export type Building = typeof buildings.$inferSelect;
export type Apartment = typeof apartments.$inferSelect;
export type Receipt = typeof receipts.$inferSelect;
export type Manager = typeof managers.$inferSelect;
