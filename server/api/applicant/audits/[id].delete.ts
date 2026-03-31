import { db } from '~~/server/utils/db';
import { eq } from 'drizzle-orm';
import { auditLogs } from '~~/server/db/schema';

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id');
  const result = await db.delete(auditLogs).where(eq(auditLogs.id, id)).returning();
  return result[0];
});
