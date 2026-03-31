import { db } from '~~/server/utils/db';
import { payments } from '~~/server/db/schema';

export default defineEventHandler(async () => {
  const allPayments = await db.select().from(payments);
  return {
    totalRevenue: allPayments.reduce((acc, p) => acc + (parseFloat(p.amount) || 0), 0),
    payments: allPayments
  };
});
