import { db } from '~/server/db/drizzle';

export default defineEventHandler(async () => {
  const invoices = await db.query.invoices.findMany({
    with: {
      user: true,
    },
  });
  return invoices;
});
