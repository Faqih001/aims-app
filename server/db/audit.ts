import { pgTable, text, timestamp, uuid, jsonb } from 'drizzle-orm/pg-core';
import { users } from './schema';

export const auditLogs = pgTable('audit_logs', {
  id: uuid('id').defaultRandom().primaryKey(),
  timestamp: timestamp('timestamp').defaultNow().notNull(),
  userId: uuid('user_id').references(() => users.id),
  action: text('action').notNull(),
  details: jsonb('details'),
});
