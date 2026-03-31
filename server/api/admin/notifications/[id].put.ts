import { db } from '~~/server/utils/db';
import { notifications } from '~~/server/db/schema';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  const notificationId = event.context.params?.id;
  if (!notificationId) {
    throw createError({ statusCode: 400, statusMessage: 'Missing notification ID' });
  }
  await db.update(notifications).set({ read: 'true' }).where(eq(notifications.id, notificationId));
  return { message: 'Notification marked as read' };
});
