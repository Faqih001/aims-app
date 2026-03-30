import { db } from '../../../../utils/db';
import { invoices, payments } from '../../../../db/schema';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  const userId = event.context.params?.id;
  if (!userId) {
    throw createError({ statusCode: 400, statusMessage: 'Missing user ID' });
  }

  const userInvoices = await db.query.invoices.findMany({
    where: eq(invoices.userId, userId),
  });

  const userPayments = await db.query.payments.findMany({
    where: eq(payments.userId, userId),
  });

  return {
    invoices: userInvoices,
    payments: userPayments,
  };
});