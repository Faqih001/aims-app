import { pgTable, text, timestamp, uuid, pgEnum, varchar, boolean, integer } from 'drizzle-orm/pg-core';

export const userRoleEnum = pgEnum('user_role', ['SYSTEM_ADMIN', 'ASSESSOR', 'APPLICANT', 'TECHNICAL_REVIEWER']);
export const applicationStatusEnum = pgEnum('application_status', ['PENDING', 'IN_REVIEW', 'APPROVED', 'REJECTED']);
export const accreditationStatusEnum = pgEnum('accreditation_status', ['ACTIVE', 'EXPIRED', 'PENDING_RENEWAL']);
export const invoiceStatusEnum = pgEnum('invoice_status', ['PAID', 'PENDING', 'OVERDUE']);
export const paymentStatusEnum = pgEnum('payment_status', ['COMPLETED', 'PENDING', 'FAILED']);
export const documentTypeEnum = pgEnum('document_type', ['CERTIFICATE', 'REPORT', 'OTHER']);

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  name: text('name').notNull(),
  fullName: text('full_name'),
  phone: text('phone'),
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
  dueDate: timestamp('due_date'),
  assessmentType: text('assessment_type'),
  reviewerAssignedDate: timestamp('reviewer_assigned_date'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const documents = pgTable('documents', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  url: text('url').notNull(),
  type: documentTypeEnum('type').default('OTHER').notNull(),
  applicationId: uuid('application_id').references(() => applications.id).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
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
  entityType: text('entity_type'),
  entityId: uuid('entity_id'),
  ipAddress: text('ip_address'),
});

export const reviewers = pgTable('reviewers', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  specialization: text('specialization'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const assessors = pgTable('assessors', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  certification: text('certification'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const invoices = pgTable('invoices', {
  id: uuid('id').defaultRandom().primaryKey(),
  date: timestamp('date').defaultNow().notNull(),
  amount: text('amount').notNull(),
  status: invoiceStatusEnum('status').default('PENDING').notNull(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  dueDate: timestamp('due_date'),
  description: text('description'),
});

export const notifications = pgTable('notifications', {
  id: uuid('id').defaultRandom().primaryKey(),
  message: text('message').notNull(),
  time: timestamp('time').defaultNow().notNull(),
  read: text('read').default('false').notNull(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  isRead: boolean('is_read').default(false).notNull(),
  actionUrl: text('action_url'),
  category: text('category'),
  priority: text('priority'),
});

export const payments = pgTable('payments', {
  id: uuid('id').defaultRandom().primaryKey(),
  transactionId: text('transaction_id').notNull(),
  date: timestamp('date').defaultNow().notNull(),
  amount: text('amount').notNull(),
  status: paymentStatusEnum('status').default('PENDING').notNull(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  paymentMethod: text('payment_method'),
  reference: text('reference'),
});

export const supportTickets = pgTable('support_tickets', {
  id: uuid('id').defaultRandom().primaryKey(),
  subject: text('subject').notNull(),
  message: text('message').notNull(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  status: text('status').default('OPEN').notNull(),
});

export const assessments = pgTable('assessments', {
  id: uuid('id').defaultRandom().primaryKey(),
  applicationId: uuid('application_id').references(() => applications.id).notNull(),
  assessorId: uuid('assessor_id').references(() => users.id).notNull(),
  outcome: text('outcome').notNull(),
  notes: text('notes'),
  score: integer('score'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const reviews = pgTable('reviews', {
  id: uuid('id').defaultRandom().primaryKey(),
  applicationId: uuid('application_id').references(() => applications.id).notNull(),
  reviewerId: uuid('reviewer_id').references(() => users.id).notNull(),
  feedback: text('feedback'),
  recommendation: text('recommendation').notNull(),
  status: text('status').default('SUBMITTED').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const schedules = pgTable('schedules', {
  id: uuid('id').defaultRandom().primaryKey(),
  applicationId: uuid('application_id').references(() => applications.id).notNull(),
  assessorId: uuid('assessor_id').references(() => users.id).notNull(),
  scheduledAt: timestamp('scheduled_at').notNull(),
  durationMinutes: integer('duration_minutes').notNull(),
  timezone: text('timezone').notNull(),
  status: text('status').default('SCHEDULED').notNull(),
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const assessmentMetrics = pgTable('assessment_metrics', {
  id: uuid('id').defaultRandom().primaryKey(),
  assessorId: uuid('assessor_id').references(() => users.id).notNull(),
  totalAssessments: integer('total_assessments').default(0).notNull(),
  completionRate: integer('completion_rate').default(0).notNull(),
  averageScore: integer('average_score'),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const applicationAssignments = pgTable('application_assignments', {
  id: uuid('id').defaultRandom().primaryKey(),
  applicationId: uuid('application_id').references(() => applications.id).notNull(),
  assessorId: uuid('assessor_id').references(() => users.id).notNull(),
  role: userRoleEnum('role').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});


