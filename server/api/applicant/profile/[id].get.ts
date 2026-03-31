import { db } from '~~/server/utils/db';
import { eq } from 'drizzle-orm';
import { users } from '~~/server/db/schema';

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id');
  const result = await db.query.users.findFirst({
    where: eq(users.id, id)
  });
  return result;
});
