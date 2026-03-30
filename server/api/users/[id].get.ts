import { db } from '../../utils/db';
import { users } from '../../db/schema';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  const userId = event.context.params?.id;
  if (!userId) {
    throw createError({ statusCode: 400, statusMessage: 'Missing user ID' });
  }
  const user = await db.query.users.findFirst({ where: eq(users.id, userId) });
  if (!user) {
    throw createError({ statusCode: 404, statusMessage: 'User not found' });
  }
  return user;
});
