import { db } from '~~/server/utils/db';
import { applicationAssignments as assignments } from '~~/server/db/schema';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const result = await db.insert(assignments).values(body).returning();
  return result[0];
});
