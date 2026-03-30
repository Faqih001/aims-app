import { db } from '~/server/db/drizzle';
import { users } from '~/server/db/schema';

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    body.role = 'TECHNICAL_REVIEWER';
    body.password = 'Reviewer123!'; // Provide a default or handle realistically
    const data = await db.insert(users).values(body).returning();
    return { data };
  } catch (error: any) {
    throw createError({ statusCode: 400, statusMessage: error.message });
  }
});
