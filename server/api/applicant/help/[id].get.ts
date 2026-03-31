import { db } from '~~/server/utils/db';
import { eq } from 'drizzle-orm';
import { supportTickets } from '~~/server/db/schema';

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id');
  const result = await db.query.supportTickets.findFirst({
    where: eq(supportTickets.id, id)
  });
  return result;
});
