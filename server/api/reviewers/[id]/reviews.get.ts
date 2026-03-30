import { db } from '../../../../utils/db';
import { reviews } from '../../../../db/schema';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  const reviewerId = event.context.params?.id;
  if (!reviewerId) {
    throw createError({ statusCode: 400, statusMessage: 'Missing reviewer ID' });
  }

  const reviewerReviews = await db.query.reviews.findMany({
    where: eq(reviews.reviewerId, reviewerId),
  });

  return reviewerReviews;
});