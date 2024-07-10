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
	rent: text('rent').$type<string>().notNull(),
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

export type Building = typeof buildings.$inferSelect;

export type Apartment = Omit<typeof apartments.$inferSelect, 'rent'> & {
	rent: number[];
};
export type Receipt = typeof receipts.$inferSelect;
export type Manager = typeof managers.$inferSelect;
