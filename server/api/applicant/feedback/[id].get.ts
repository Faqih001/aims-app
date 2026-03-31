import { db } from '~~/server/utils/db';
import { eq } from 'drizzle-orm';
import { reviews } from '~~/server/db/schema';

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id');
  const result = await db.query.reviews.findFirst({
    where: eq(reviews.id, id)
  });
  return result;
});
