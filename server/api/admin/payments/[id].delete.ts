import { db } from '~~/server/utils/db';
import { eq } from 'drizzle-orm';
import { payments } from '~~/server/db/schema';

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id');
  const result = await db.delete(payments).where(eq(payments.id, id)).returning();
  return result[0];
});
