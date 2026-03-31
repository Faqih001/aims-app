import { db } from '~~/server/utils/db';
import { eq } from 'drizzle-orm';
import { reviews } from '~~/server/db/schema';

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id');
  const result = await db.delete(reviews).where(eq(reviews.id, id)).returning();
  return result[0];
});
