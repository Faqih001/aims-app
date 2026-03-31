import { db } from '~~/server/utils/db';
import { eq } from 'drizzle-orm';
import { schedules } from '~~/server/db/schema';

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id');
  const result = await db.delete(schedules).where(eq(schedules.id, id)).returning();
  return result[0];
});
