import { db } from '~~/server/db/drizzle';
import { assessors } from '~~/server/db/schema';
import { desc, eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  try {
    const id = event.context.params?.id;
    if (!id) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Bad Request, id is required',
      });
    }
    const data = await db.delete(assessors).where(eq(assessors.id, id)).returning();
    return {
      data,
    };
  } catch (error: any) {
    throw createError({
      statusCode: 400,
      statusMessage: error.message,
    });
  }
});
