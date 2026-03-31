import { db } from './drizzle';
import { users, organizations, applications, invoices, documents } from './schema';
import { eq } from 'drizzle-orm';

async function main() {
  console.log('Seeding Database...');

  // 1. Seed Organizations
  const [org] = await db.insert(organizations).values([
    {
       name: 'Tech Corp Industries',
       registrationNumber: 'REG-12003',
       contactEmail: 'contact@techcorp.com'
    }
  ]).returning();

  // 2. Seed Users
  const [admin] = await db.insert(users).values({ email: 'admin@aims.local', name: 'Admin', role: 'SYSTEM_ADMIN' }).returning()
  const [applicant] = await db.insert(users).values({ email: 'john@techcorp.com', name: 'John Applicant', role: 'APPLICANT', organizationId: org.id }).returning()
  const [assessor] = await db.insert(users).values({ email: 'sarah@aims.local', name: 'Sarah Assessor', role: 'ASSESSOR' }).returning()

  // 3. Seed Application
  const [app] = await db.insert(applications).values({
     applicantId: applicant.id,
     organizationId: org.id,
     scope: 'ISO 27001 Certification',
     status: 'PENDING',
     assessmentType: 'Initial'
  }).returning()

  // 4. Seed Invoice
  await db.insert(invoices).values({
     amount: '1500.00',
     status: 'PENDING',
     userId: applicant.id,
     description: 'Initial ISO 27001 Assessment Fee'
  })

  // 5. Seed Document
  await db.insert(documents).values({
     name: 'Registration_Certificate.pdf',
     url: '/uploads/reg_cert.pdf',
     type: 'CERTIFICATE',
     applicationId: app.id
  })

  console.log('Seeding Complete! ✅');
  process.exit(0);
}

main().catch((e) => {
  console.error('Seeding failed:', e);
  process.exit(1);
});
