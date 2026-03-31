import { db } from '~~/server/utils/db';
import { eq } from 'drizzle-orm';
import { schedules } from '~~/server/db/schema';

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id');
  const body = await readBody(event);
  const result = await db.update(schedules).set(body).where(eq(schedules.id, id)).returning();
  return result[0];
});
