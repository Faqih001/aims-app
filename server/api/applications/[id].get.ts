import { db } from '../../../utils/db';
import { applications } from '../../../db/schema';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  const applicationId = event.context.params?.id;
  if (!applicationId) {
    throw createError({ statusCode: 400, statusMessage: 'Missing application ID' });
  }
  const application = await db.query.applications.findFirst({ 
    where: eq(applications.id, applicationId),
    with: {
      applicant: true,
      organization: true,
    }
  });
  if (!application) {
    throw createError({ statusCode: 404, statusMessage: 'Application not found' });
  }
  return application;
});
