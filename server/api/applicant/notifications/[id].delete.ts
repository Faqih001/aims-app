import { db } from '~~/server/utils/db';
import { eq } from 'drizzle-orm';
import { notifications } from '~~/server/db/schema';

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id');
  const result = await db.delete(notifications).where(eq(notifications.id, id)).returning();
  return result[0];
});
