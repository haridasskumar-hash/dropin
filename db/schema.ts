import { sqliteTable, text, integer, index } from "drizzle-orm/sqlite-core";
export const content = sqliteTable("content", { id: text("id").primaryKey(), kind: text("kind").notNull(), data: text("data").notNull() });

export const bookings = sqliteTable('bookings', {
 id:text('id').primaryKey(), email:text('email').notNull(), date:text('date').notNull(), status:text('status').notNull().default('pending'), data:text('data').notNull(), createdAt:integer('created_at').notNull()
},table=>[index('bookings_email_created').on(table.email,table.createdAt),index('bookings_created').on(table.createdAt)]);
