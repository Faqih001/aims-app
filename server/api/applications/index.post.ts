import { db } from '../../utils/db';
import { applications, organizations } from '../../db/schema';
import { z } from 'zod';
import { eq } from 'drizzle-orm';

const schema = z.object({
  organizationName: z.string().min(3),
  registrationNumber: z.string().min(3),
  contactEmail: z.string().email(),
  scope: z.string().min(10),
  applicantId: z.string(),
});

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const validation = schema.safeParse(body);
  if (!validation.success) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid input' });
  }

  const { organizationName, registrationNumber, contactEmail, scope, applicantId } = validation.data;

  let organization = await db.query.organizations.findFirst({
    where: eq(organizations.registrationNumber, registrationNumber),
  });

  if (!organization) {
    [organization] = await db.insert(organizations).values({
      name: organizationName,
      registrationNumber,
      contactEmail,
    }).returning();
  }

  const [newApplication] = await db.insert(applications).values({
    applicantId,
    organizationId: organization.id,
    scope,
  }).returning();

  return newApplication;
});
