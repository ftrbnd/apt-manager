import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod/v4';

export const users = pgTable('user', {
	id: text('id').primaryKey(),
	firstName: text('first_name'),
	lastName: text('last_name'),
	email: text('email'),
	avatar: text('avatar'),
	createdAt: timestamp('created_at', {
		withTimezone: true,
		mode: 'string',
	}).defaultNow(),
});
export type User = typeof users.$inferSelect;

export const insertUserSchema = createInsertSchema(users);
export type NewUser = z.infer<typeof insertUserSchema>;
