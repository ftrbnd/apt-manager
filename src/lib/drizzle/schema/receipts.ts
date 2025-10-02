import { pgEnum, pgTable, real, text, timestamp } from 'drizzle-orm/pg-core';
import { createSelectSchema, createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';
import { apartments } from './apartments';

const paymentMethodEnum = pgEnum('payment_method', [
	'CHECK',
	'MONEY ORDER',
	'OTHER',
]);

export const receipts = pgTable('receipts', {
	id: text('id').primaryKey(),
	apartmentId: text('apartment_id')
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
export type Receipt = typeof receipts.$inferSelect;

export const selectReceiptSchema = createSelectSchema(receipts);
export const insertReceiptSchema = createInsertSchema(receipts);
export type NewReceipt = z.infer<typeof insertReceiptSchema>;
