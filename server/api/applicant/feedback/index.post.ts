import { db } from '~~/server/utils/db';
import { reviews } from '~~/server/db/schema';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const result = await db.insert(reviews).values(body).returning();
  return result[0];
});
