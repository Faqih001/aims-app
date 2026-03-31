import { db } from '~~/server/utils/db';
import { eq } from 'drizzle-orm';
import { applicationAssignments as assignments } from '~~/server/db/schema';

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id');
  const result = await db.delete(assignments).where(eq(assignments.id, id)).returning();
  return result[0];
});
