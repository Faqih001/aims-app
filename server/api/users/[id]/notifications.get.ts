import { db } from '../../../../utils/db';
import { notifications } from '../../../../db/schema';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  const userId = event.context.params?.id;
  if (!userId) {
    throw createError({ statusCode: 400, statusMessage: 'Missing user ID' });
  }

  const userNotifications = await db.query.notifications.findMany({
    where: eq(notifications.userId, userId),
    orderBy: (notifications, { desc }) => [desc(notifications.createdAt)],
  });

  return userNotifications;
});