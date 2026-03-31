import { db } from '~~/server/utils/db';
import { eq } from 'drizzle-orm';
import { applications } from '~~/server/db/schema';

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id');
  const result = await db.query.applications.findFirst({
    where: eq(applications.id, id)
  });
  return result;
});
