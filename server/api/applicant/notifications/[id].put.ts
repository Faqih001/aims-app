import { db } from '~~/server/utils/db';
import { eq } from 'drizzle-orm';
import { notifications } from '~~/server/db/schema';

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id');
  const body = await readBody(event);
  const result = await db.update(notifications).set(body).where(eq(notifications.id, id)).returning();
  return result[0];
});
