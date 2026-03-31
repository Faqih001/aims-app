import { db } from './drizzle';
import { 
  users, organizations, applications, documents, accreditations, auditLogs, 
  reviewers, assessors, invoices, notifications, payments, supportTickets,
  assessments, reviews, schedules, assessmentMetrics, applicationAssignments 
} from './schema';

async function seed() {
  console.log('Seeding the database with extended data...');

  // Reset data (tables with foreign keys first)
  await db.delete(applicationAssignments);
  await db.delete(assessmentMetrics);
  await db.delete(schedules);
  await db.delete(reviews);
  await db.delete(assessments);
  await db.delete(supportTickets);
  await db.delete(payments);
  await db.delete(notifications);
  await db.delete(invoices);
  await db.delete(assessors);
  await db.delete(reviewers);
  await db.delete(auditLogs);
  await db.delete(accreditations);
  await db.delete(documents);
  await db.delete(applications);
  await db.delete(organizations);
  await db.delete(users);

  // Users
  const newUsers = await db.insert(users).values([
    { email: 'admin1@example.com', name: 'Admin One', role: 'SYSTEM_ADMIN' },
    { email: 'applicant1@example.com', name: 'App One', role: 'APPLICANT' },
    { email: 'applicant2@example.com', name: 'App Two', role: 'APPLICANT' },
    { email: 'assessor1@example.com', name: 'Assessor One', role: 'ASSESSOR' },
    { email: 'assessor2@example.com', name: 'Assessor Two', role: 'ASSESSOR' },
    { email: 'reviewer1@example.com', name: 'Rev One', role: 'TECHNICAL_REVIEWER' },
    { email: 'reviewer2@example.com', name: 'Rev Two', role: 'TECHNICAL_REVIEWER' }
  ]).returning();
  
  const appUsers = newUsers.filter(u => u.role === 'APPLICANT');
  const assUsers = newUsers.filter(u => u.role === 'ASSESSOR');
  const revUsers = newUsers.filter(u => u.role === 'TECHNICAL_REVIEWER');

  // Reviewers & Assessors Profiles (missing in previous seed)
  await db.insert(reviewers).values([
    { userId: revUsers[0].id, specialization: 'Information Security' },
    { userId: revUsers[1].id, specialization: 'Environmental Systems' }
  ]);
  
  await db.insert(assessors).values([
    { userId: assUsers[0].id, certification: 'Lead Auditor ISO 9001' },
    { userId: assUsers[1].id, certification: 'Lead Auditor ISO 27001' }
  ]);

  // Organizations
  const newOrgs = await db.insert(organizations).values([
    { name: 'Org A', registrationNumber: 'REG-001', contactEmail: 'contact@orga.com' },
    { name: 'Org B', registrationNumber: 'REG-002', contactEmail: 'contact@orgb.com' },
    { name: 'Org C', registrationNumber: 'REG-003', contactEmail: 'contact@orgc.com' },
    { name: 'Org D', registrationNumber: 'REG-004', contactEmail: 'contact@orgd.com' },
    { name: 'Org E', registrationNumber: 'REG-005', contactEmail: 'contact@orge.com' }
  ]).returning();

  // Applications
  const newApps = await db.insert(applications).values([
    { applicantId: appUsers[0].id, organizationId: newOrgs[0].id, scope: 'ISO 9001', status: 'PENDING', assessmentType: 'Initial' },
    { applicantId: appUsers[1].id, organizationId: newOrgs[1].id, scope: 'ISO 27001', status: 'IN_REVIEW', assessmentType: 'Surveillance' },
    { applicantId: appUsers[0].id, organizationId: newOrgs[2].id, scope: 'ISO 14001', status: 'APPROVED', assessmentType: 'Renewal' },
    { applicantId: appUsers[1].id, organizationId: newOrgs[3].id, scope: 'OHSAS 18001', status: 'REJECTED', assessmentType: 'Initial' },
    { applicantId: appUsers[0].id, organizationId: newOrgs[4].id, scope: 'ISO 45001', status: 'PENDING', assessmentType: 'Surveillance' }
  ]).returning();

  // Documents
  await db.insert(documents).values([
    { name: 'Cert1.pdf', url: '/files/cert1.pdf', type: 'CERTIFICATE', applicationId: newApps[0].id },
    { name: 'Rep1.pdf', url: '/files/rep1.pdf', type: 'REPORT', applicationId: newApps[1].id },
    { name: 'Cert2.pdf', url: '/files/cert2.pdf', type: 'CERTIFICATE', applicationId: newApps[2].id },
    { name: 'Other1.zip', url: '/files/other1.zip', type: 'OTHER', applicationId: newApps[3].id },
    { name: 'Rep2.pdf', url: '/files/rep2.pdf', type: 'REPORT', applicationId: newApps[4].id }
  ]);
  
  // Accreditations
  await db.insert(accreditations).values([
    { name: 'ISO 9001 Cert', status: 'PENDING_RENEWAL', applicationId: newApps[0].id, expiryDate: new Date() },
    { name: 'ISO 14001 Cert', status: 'ACTIVE', applicationId: newApps[2].id, expiryDate: new Date() },
    { name: 'ISO 27001 Cert', status: 'ACTIVE', applicationId: newApps[1].id, expiryDate: new Date() },
    { name: 'OHSAS 18001 Cert', status: 'EXPIRED', applicationId: newApps[3].id, expiryDate: new Date() },
    { name: 'ISO 45001 Cert', status: 'ACTIVE', applicationId: newApps[4].id, expiryDate: new Date() }
  ]);

  // Invoices
  await db.insert(invoices).values([
    { amount: '1000', status: 'PENDING', userId: appUsers[0].id, description: 'Initial fee' },
    { amount: '500', status: 'PAID', userId: appUsers[1].id, description: 'Surveillance fee' },
    { amount: '1200', status: 'OVERDUE', userId: appUsers[0].id, description: 'Renewal fee' },
    { amount: '1000', status: 'PENDING', userId: appUsers[1].id, description: 'Initial fee' },
    { amount: '2000', status: 'PAID', userId: appUsers[0].id, description: 'Fast track fee' }
  ]);

  // Payments
  await db.insert(payments).values([
    { transactionId: 'TXN100', amount: '500', status: 'COMPLETED', userId: appUsers[1].id, paymentMethod: 'Credit Card' },
    { transactionId: 'TXN101', amount: '2000', status: 'COMPLETED', userId: appUsers[0].id, paymentMethod: 'Bank Transfer' },
    { transactionId: 'TXN102', amount: '1000', status: 'PENDING', userId: appUsers[0].id, paymentMethod: 'PayPal' },
    { transactionId: 'TXN103', amount: '1200', status: 'FAILED', userId: appUsers[0].id, paymentMethod: 'Credit Card' },
    { transactionId: 'TXN104', amount: '500', status: 'COMPLETED', userId: appUsers[1].id, paymentMethod: 'Credit Card' }
  ]);

  // Support Tickets
  await db.insert(supportTickets).values([
    { subject: 'Login issue', message: 'I cannot login', userId: appUsers[0].id },
    { subject: 'Payment failed', message: 'My card was declined', userId: appUsers[1].id },
    { subject: 'Document upload error', message: 'Error 500 when uploading PDF', userId: appUsers[0].id },
    { subject: 'How to renew?', message: 'When does my cert expire?', userId: appUsers[1].id },
    { subject: 'Feedback on portal', message: 'Great portal!', userId: appUsers[0].id }
  ]);

  // Assignments
  await db.insert(applicationAssignments).values([
    { applicationId: newApps[0].id, assessorId: assUsers[0].id, role: 'ASSESSOR' },
    { applicationId: newApps[1].id, assessorId: assUsers[1].id, role: 'ASSESSOR' },
    { applicationId: newApps[2].id, assessorId: assUsers[0].id, role: 'ASSESSOR' },
    { applicationId: newApps[3].id, assessorId: revUsers[0].id, role: 'TECHNICAL_REVIEWER' },
    { applicationId: newApps[4].id, assessorId: revUsers[1].id, role: 'TECHNICAL_REVIEWER' }
  ]);

  // Schedules (Assessor role needs this)
  await db.insert(schedules).values([
    { applicationId: newApps[0].id, assessorId: assUsers[0].id, scheduledAt: new Date(), durationMinutes: 120, timezone: 'UTC', status: 'SCHEDULED', notes: 'Initial meeting' },
    { applicationId: newApps[1].id, assessorId: assUsers[1].id, scheduledAt: new Date(), durationMinutes: 60, timezone: 'UTC', status: 'SCHEDULED', notes: 'Follow up' },
    { applicationId: newApps[2].id, assessorId: assUsers[0].id, scheduledAt: new Date(), durationMinutes: 90, timezone: 'UTC', status: 'COMPLETED', notes: 'Site visit' },
    { applicationId: newApps[3].id, assessorId: assUsers[1].id, scheduledAt: new Date(), durationMinutes: 120, timezone: 'UTC', status: 'CANCELLED', notes: 'Client unavailable' },
    { applicationId: newApps[4].id, assessorId: assUsers[0].id, scheduledAt: new Date(), durationMinutes: 150, timezone: 'UTC', status: 'SCHEDULED', notes: 'Final review' }
  ]);

  // Assessments
  await db.insert(assessments).values([
    { applicationId: newApps[0].id, assessorId: assUsers[0].id, outcome: 'Pass', score: 85, notes: 'Good systems in place' },
    { applicationId: newApps[1].id, assessorId: assUsers[1].id, outcome: 'Pass', score: 92, notes: 'Excellent compliance' },
    { applicationId: newApps[2].id, assessorId: assUsers[0].id, outcome: 'Fail', score: 55, notes: 'Major non-conformities found' }
  ]);

  // Reviews (Reviewer role needs this)
  await db.insert(reviews).values([
    { applicationId: newApps[0].id, reviewerId: revUsers[0].id, feedback: 'Looks consistent', recommendation: 'Approve', status: 'SUBMITTED' },
    { applicationId: newApps[1].id, reviewerId: revUsers[1].id, feedback: 'Minor issues noted', recommendation: 'Revise', status: 'DRAFT' },
    { applicationId: newApps[2].id, reviewerId: revUsers[0].id, feedback: 'Everything aligns perfectly', recommendation: 'Approve', status: 'SUBMITTED' }
  ]);

  // Audit Logs
  await db.insert(auditLogs).values([
    { action: 'USER_LOGIN', userId: appUsers[0].id, details: 'User logged in' },
    { action: 'APP_SUBMITTED', userId: appUsers[1].id, details: 'Application submitted', entityId: newApps[1].id, entityType: 'application' },
    { action: 'PAYMENT_MADE', userId: appUsers[0].id, details: 'Payment processed' },
    { action: 'TICKET_OPENED', userId: appUsers[1].id, details: 'Support ticket created' },
    { action: 'DOC_UPLOADED', userId: appUsers[0].id, details: 'Document uploaded' }
  ]);

  // Notifications
  await db.insert(notifications).values([
    { message: 'Your application is pending', userId: appUsers[0].id },
    { message: 'Payment successfully processed', userId: appUsers[1].id },
    { message: 'New message from support', userId: appUsers[0].id },
    { message: 'Document approved', userId: appUsers[1].id },
    { message: 'Action required on your application', userId: appUsers[0].id }
  ]);

  console.log('Database seeded successfully!');
  process.exit(0);
}

seed().catch(err => {
  console.error('Seed error:', err);
  process.exit(1);
});
