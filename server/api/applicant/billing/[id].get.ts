import { db } from '~~/server/utils/db';
import { eq } from 'drizzle-orm';
import { payments } from '~~/server/db/schema';

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id');
  const result = await db.query.payments.findFirst({
    where: eq(payments.id, id)
  });
  return result;
});
