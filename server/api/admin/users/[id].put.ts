import { db } from '~~/server/utils/db';
import { eq } from 'drizzle-orm';
import { users } from '~~/server/db/schema';

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id');
  const body = await readBody(event);
  const result = await db.update(users).set(body).where(eq(users.id, id)).returning();
  return result[0];
});
