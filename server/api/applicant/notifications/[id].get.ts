import { db } from '~~/server/utils/db';
import { eq } from 'drizzle-orm';
import { notifications } from '~~/server/db/schema';

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id');
  const result = await db.query.notifications.findFirst({
    where: eq(notifications.id, id)
  });
  return result;
});
