import { db } from '~~/server/db/drizzle';
import { assessors } from '~~/server/db/schema';

export default defineEventHandler(async () => {
  const allAssessors = await db.select().from(assessors);
  return allAssessors;
});
