import { db } from '~~/server/utils/db';

export default defineEventHandler(async () => {
  const invoices = await db.query.invoices.findMany({
    columns: {
      amount: true,
      status: true,
      date: true,
    },
  });

  return {
    totalInvoices: invoices.length,
    invoices,
  };
});