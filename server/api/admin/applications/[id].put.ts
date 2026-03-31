import { db } from '~~/server/utils/db';
import { eq } from 'drizzle-orm';
import { applications } from '~~/server/db/schema';

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id');
  const body = await readBody(event);
  const result = await db.update(applications).set(body).where(eq(applications.id, id)).returning();
  return result[0];
});
