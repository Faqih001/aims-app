import { db } from '../../utils/db';
import { reviews } from '../../db/schema';

export default defineEventHandler(async (event) => {
  const { applicationId, reviewerId, feedback, recommendation, status } = await readBody(event);

  if (!applicationId || !reviewerId || !recommendation) {
    throw createError({ statusCode: 400, statusMessage: 'Missing required fields' });
  }

  const newReview = await db.insert(reviews).values({
    applicationId,
    reviewerId,
    feedback,
    recommendation,
    status: status ?? 'SUBMITTED',
  }).returning();

  return newReview[0];
});