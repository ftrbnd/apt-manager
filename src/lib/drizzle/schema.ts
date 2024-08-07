import {
	boolean,
	pgEnum,
	pgTable,
	real,
	serial,
	text,
	timestamp,
} from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

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
	note: text('note'),
	buildingId: serial('building_id')
		.notNull()
		.references(() => buildings.id, { onDelete: 'cascade' }),
});

export const receipts = pgTable('receipts', {
	id: serial('id').primaryKey(),
	apartmentId: serial('apartment_id')
		.notNull()
		.references(() => apartments.id, { onDelete: 'cascade' }),
	month: real('month').notNull(),
	year: real('year').notNull(),
	value: real('value').notNull(),
	tenant: text('tenant').notNull(),
	paymentMethod: paymentMethodEnum('payment_methods').notNull(),
	createdAt: timestamp('created_at', {
		withTimezone: true,
		mode: 'string',
	}).defaultNow(),
});

export const managers = pgTable('managers', {
	id: serial('id').primaryKey(),
	clerkUserId: text('clerk_user_id').notNull().unique(),
	buildingId: serial('building_id')
		.references(() => buildings.id, {
			onDelete: 'cascade',
		})
		.notNull(),
	approved: boolean('approved').default(false),
	firstName: text('first_name'),
	lastName: text('last_name'),
	email: text('email'),
	avatar: text('avatar'),
	createdAt: timestamp('created_at', {
		withTimezone: true,
		mode: 'string',
	}).defaultNow(),
});

export const selectApartmentSchema = createSelectSchema(apartments);
export const insertApartmentSchema = createInsertSchema(apartments);

export const insertBuildingSchema = createInsertSchema(buildings);

export const insertManagerSchema = createInsertSchema(managers);

export const selectReceiptSchema = createSelectSchema(receipts);
export const insertReceiptSchema = createInsertSchema(receipts);

export type NewApartment = z.infer<typeof insertApartmentSchema>;
export type NewBuilding = z.infer<typeof insertBuildingSchema>;
export type NewManager = z.infer<typeof insertManagerSchema>;
export type NewReceipt = z.infer<typeof insertReceiptSchema>;

export type Apartment = typeof apartments.$inferSelect;
export type Building = typeof buildings.$inferSelect;
export type Manager = typeof managers.$inferSelect;
export type Receipt = typeof receipts.$inferSelect;
