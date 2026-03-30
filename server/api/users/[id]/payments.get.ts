import { db } from '../../../../utils/db';
import { payments } from '../../../../db/schema';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  const userId = event.context.params?.id;
  if (!userId) {
    throw createError({ statusCode: 400, statusMessage: 'Missing user ID' });
  }

  const userPayments = await db.query.payments.findMany({
    where: eq(payments.userId, userId),
    orderBy: (payments, { desc }) => [desc(payments.createdAt)],
  });

  return userPayments;
});