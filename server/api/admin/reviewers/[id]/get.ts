import { db } from '~/server/db/drizzle';
import { users } from '~/server/db/schema';
import { desc, eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  try {
    const id = Number(event.context.params?.id);
    if (!id) throw createError({ statusCode: 400, statusMessage: 'Bad Request' });
    const data = await db.select().from(users).where(eq(users.id, id));
    return data.length ? data[0] : null;
  } catch (error: any) {
    throw createError({ statusCode: 400, statusMessage: error.message });
  }
});
