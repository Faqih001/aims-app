import { db } from '~~/server/utils/db';
import { eq } from 'drizzle-orm';
import { reviews } from '~~/server/db/schema';

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id');
  const body = await readBody(event);
  const result = await db.update(reviews).set(body).where(eq(reviews.id, id)).returning();
  return result[0];
});
