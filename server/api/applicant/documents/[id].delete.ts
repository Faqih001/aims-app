import { db } from '~~/server/utils/db';
import { eq } from 'drizzle-orm';
import { documents } from '~~/server/db/schema';

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id');
  const result = await db.delete(documents).where(eq(documents.id, id)).returning();
  return result[0];
});
