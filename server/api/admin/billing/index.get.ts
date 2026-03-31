import { db } from '~~/server/utils/db';

export default defineEventHandler(async () => {
  const invoices = await db.query.invoices.findMany({
    with: {
      user: {
        columns: {
          name: true,
        },
      },
    },
    orderBy: (invoices, { desc }) => [desc(invoices.date)],
  });
  return invoices;
});
