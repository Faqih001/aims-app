import { pgTable, text, timestamp, uuid, pgEnum, varchar, boolean, integer, jsonb } from 'drizzle-orm/pg-core';

export const userRoleEnum = pgEnum('user_role', ['SYSTEM_ADMIN', 'ASSESSOR', 'APPLICANT', 'TECHNICAL_REVIEWER']);
export const applicationStatusEnum = pgEnum('application_status', ['PENDING', 'IN_REVIEW', 'APPROVED', 'REJECTED', 'PAYMENT_PENDING']);
export const accreditationStatusEnum = pgEnum('accreditation_status', ['ACTIVE', 'EXPIRED', 'PENDING_RENEWAL', 'REVOKED']);
export const invoiceStatusEnum = pgEnum('invoice_status', ['PAID', 'PENDING', 'OVERDUE', 'CANCELLED']);
export const paymentStatusEnum = pgEnum('payment_status', ['COMPLETED', 'PENDING', 'FAILED', 'REFUNDED']);
export const documentTypeEnum = pgEnum('document_type', ['CERTIFICATE', 'REPORT', 'EVIDENCE', 'POLICY', 'OTHER']);
export const documentStatusEnum = pgEnum('document_status', ['PENDING', 'APPROVED', 'REJECTED']);
export const actionItemStatusEnum = pgEnum('action_item_status', ['PENDING', 'IN_PROGRESS', 'COMPLETED']);

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  password: text('password').notNull(),
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
  formData: jsonb('form_data'), // Handles large application structures precisely
  reviewerAssignedDate: timestamp('reviewer_assigned_date'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const documents = pgTable('documents', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  url: text('url').notNull(),
  type: documentTypeEnum('type').default('OTHER').notNull(),
  status: documentStatusEnum('status').default('PENDING').notNull(),
  comments: text('comments'),
  applicationId: uuid('application_id').references(() => applications.id).notNull(),
  uploadedBy: uuid('uploaded_by').references(() => users.id),
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

export const invoiceItems = pgTable('invoice_items', {
  id: uuid('id').defaultRandom().primaryKey(),
  invoiceId: uuid('invoice_id').references(() => invoices.id).notNull(),
  description: text('description').notNull(),
  quantity: integer('quantity').default(1).notNull(),
  unitPrice: text('unit_price').notNull(),
  total: text('total').notNull(),
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
  invoiceId: uuid('invoice_id').references(() => invoices.id),
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
  status: text('status').default('IN_PROGRESS').notNull(),
  outcome: text('outcome').notNull(),
  notes: text('notes'),
  reportUrl: text('report_url'), 
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
  userId: uuid('user_id').references(() => users.id).notNull(), // Both assessors and reviewers
  scheduledAt: timestamp('scheduled_at').notNull(),
  durationMinutes: integer('duration_minutes').notNull(),
  timezone: text('timezone').notNull(),
  status: text('status').default('SCHEDULED').notNull(),
  meetingLink: text('meeting_link'),
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const assessmentMetrics = pgTable('assessment_metrics', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  totalAssessments: integer('total_assessments').default(0).notNull(),
  completionRate: integer('completion_rate').default(0).notNull(),
  averageScore: integer('average_score'),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const applicationAssignments = pgTable('application_assignments', {
  id: uuid('id').defaultRandom().primaryKey(),
  applicationId: uuid('application_id').references(() => applications.id).notNull(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  role: userRoleEnum('role').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const userSettings = pgTable('user_settings', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').references(() => users.id).notNull().unique(),
  emailNotifications: boolean('email_notifications').default(true).notNull(),
  smsNotifications: boolean('sms_notifications').default(false).notNull(),
  theme: text('theme').default('light').notNull(),
  language: text('language').default('en').notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const messages = pgTable('messages', {
  id: uuid('id').defaultRandom().primaryKey(),
  senderId: uuid('sender_id').references(() => users.id).notNull(),
  receiverId: uuid('receiver_id').references(() => users.id),
  applicationId: uuid('application_id').references(() => applications.id),
  subject: text('subject'),
  body: text('body').notNull(),
  isRead: boolean('is_read').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const systemFeedback = pgTable('system_feedback', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  rating: integer('rating').notNull(),
  comments: text('comments'),
  category: text('category'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const ticketMessages = pgTable('ticket_messages', {
  id: uuid('id').defaultRandom().primaryKey(),
  ticketId: uuid('ticket_id').references(() => supportTickets.id).notNull(),
  senderId: uuid('sender_id').references(() => users.id).notNull(),
  message: text('message').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});


