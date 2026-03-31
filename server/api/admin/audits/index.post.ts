import { db } from '~~/server/utils/db';
import { auditLogs } from '~~/server/db/schema';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const result = await db.insert(auditLogs).values(body).returning();
  return result[0];
});
