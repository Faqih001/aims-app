import { db } from '~~/server/utils/db';
import { users } from '~~/server/db/schema';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id;
  if (!id) throw createError({ statusCode: 400, statusMessage: 'ID missing' });
  const user = await db.select().from(users).where(eq(users.id, id)).limit(1);
  return user[0] || {};
});
