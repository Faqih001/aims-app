import { db } from '~~/server/utils/db';
import { auditLogs } from '~~/server/db/schema';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id;
  if (!id) throw createError({ statusCode: 400, statusMessage: 'ID missing' });
  const body = await readBody(event);
  await db.update(auditLogs).set(body).where(eq(auditLogs.id, id));
  return { success: true };
});
