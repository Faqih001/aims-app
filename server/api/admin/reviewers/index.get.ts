import { db } from '~/server/db/drizzle';
import { reviewers } from '~/server/db/schema';

export default defineEventHandler(async () => {
  const allReviewers = await db.select().from(reviewers);
  return allReviewers;
});
