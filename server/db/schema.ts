import { pgTable, text, timestamp, uuid, pgEnum, varchar } from 'drizzle-orm/pg-core';

export const userRoleEnum = pgEnum('user_role', ['SYSTEM_ADMIN', 'ASSESSOR', 'APPLICANT', 'TECHNICAL_REVIEWER']);
export const applicationStatusEnum = pgEnum('application_status', ['PENDING', 'IN_REVIEW', 'APPROVED', 'REJECTED']);
export const accreditationStatusEnum = pgEnum('accreditation_status', ['ACTIVE', 'EXPIRED', 'PENDING_RENEWAL']);

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  name: text('name').notNull(),
  role: userRoleEnum('role').default('APPLICANT').notNull(),
  organizationId: uuid('organization_id'), // fk to organizations
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const organizations = pgTable('organizations', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  registrationNumber: text('registration_number').unique().notNull(),
  contactEmail: varchar('contact_email', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const applications = pgTable('applications', {
  id: uuid('id').defaultRandom().primaryKey(),
  applicantId: uuid('applicant_id').references(() => users.id).notNull(),
  organizationId: uuid('organization_id').references(() => organizations.id).notNull(),
  scope: text('scope').notNull(),
  status: applicationStatusEnum('status').default('PENDING').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const accreditations = pgTable('accreditations', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  status: accreditationStatusEnum('status').default('PENDING_RENEWAL').notNull(),
  expiryDate: timestamp('expiry_date'),
  applicationId: uuid('application_id').references(() => applications.id).notNull(),
});

export const auditLogs = pgTable('audit_logs', {
  id: uuid('id').defaultRandom().primaryKey(),
  timestamp: timestamp('timestamp').defaultNow().notNull(),
  userId: uuid('user_id').references(() => users.id),
  action: text('action').notNull(),
  details: text('details'),
});
