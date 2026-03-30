import { db } from '../../../../utils/db';
import { reviews } from '../../../../db/schema';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  const applicationId = event.context.params?.id;
  if (!applicationId) {
    throw createError({ statusCode: 400, statusMessage: 'Missing application ID' });
  }

  const applicationReviews = await db.query.reviews.findMany({
    where: eq(reviews.applicationId, applicationId),
  });

  return applicationReviews;
});