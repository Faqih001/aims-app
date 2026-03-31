import { db } from '~~/server/utils/db';

export default defineEventHandler(async () => {
  const payments = await db.query.payments.findMany({
    with: {
      user: {
        columns: {
          name: true,
        },
      },
    },
    orderBy: (payments, { desc }) => [desc(payments.date)],
  });
  return payments;
});
