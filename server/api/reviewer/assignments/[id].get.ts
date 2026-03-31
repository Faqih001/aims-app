import { db } from '~~/server/utils/db';
import { eq } from 'drizzle-orm';
import { applicationAssignments as assignments } from '~~/server/db/schema';

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id');
  const result = await db.query.assignments.findFirst({
    where: eq(assignments.id, id)
  });
  return result;
});
