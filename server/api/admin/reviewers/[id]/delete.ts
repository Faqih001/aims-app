import { db } from '../../../../../server/db/drizzle';
import { users } from '../../../../../server/db/schema';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  try {
    const id = event.context.params?.id as string;
    if (!id) throw createError({ statusCode: 400, statusMessage: 'Bad Request' });
    const data = await db.delete(users).where(eq(users.id, id)).returning();
    return { data };
  } catch (error: any) {
    throw createError({ statusCode: 400, statusMessage: error.message });
  }
});
