import { db } from '~~/server/utils/db';
import { eq } from 'drizzle-orm';
import { auditLogs } from '~~/server/db/schema';

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id');
  const body = await readBody(event);
  const result = await db.update(auditLogs).set(body).where(eq(auditLogs.id, id)).returning();
  return result[0];
});
