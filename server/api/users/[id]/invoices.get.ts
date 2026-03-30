import { db } from '../../../../utils/db';
import { invoices } from '../../../../db/schema';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  const userId = event.context.params?.id;
  if (!userId) {
    throw createError({ statusCode: 400, statusMessage: 'Missing user ID' });
  }

  const userInvoices = await db.query.invoices.findMany({
    where: eq(invoices.userId, userId),
  });

  return userInvoices;
});