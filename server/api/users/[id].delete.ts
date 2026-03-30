import { db } from '~/server/utils/db';
import { users } from '~/server/db/schema';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  const userId = event.context.params?.id;
  if (!userId) {
    throw createError({ statusCode: 400, statusMessage: 'Missing user ID' });
  }
  await db.delete(users).where(eq(users.id, userId));
  return { message: 'User deleted' };
});
