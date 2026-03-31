import { db } from '~~/server/utils/db';
import { assessments } from '~~/server/db/schema';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  const applicationId = event.context.params?.id;
  if (!applicationId) {
    throw createError({ statusCode: 400, statusMessage: 'Missing application ID' });
  }

  const applicationFeedback = await db.query.assessments.findMany({
    where: eq(assessments.applicationId, applicationId),
  });

  return applicationFeedback;
});