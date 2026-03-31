import { db } from '~~/server/utils/db';
import { eq } from 'drizzle-orm';
import { payments } from '~~/server/db/schema';

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id');
  const body = await readBody(event);
  const result = await db.update(payments).set(body).where(eq(payments.id, id)).returning();
  return result[0];
});
