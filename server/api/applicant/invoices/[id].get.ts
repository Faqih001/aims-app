import { db } from '~~/server/utils/db';
import { eq } from 'drizzle-orm';
import { invoices } from '~~/server/db/schema';

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id');
  const result = await db.query.invoices.findFirst({
    where: eq(invoices.id, id)
  });
  return result;
});
