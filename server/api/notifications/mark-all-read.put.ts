import { db } from '~~/server/utils/db';
import { notifications } from '~~/server/db/schema';
import { inArray } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  const { ids } = await readBody(event);

  if (!ids || !Array.isArray(ids)) {
    throw createError({ statusCode: 400, statusMessage: 'Missing notification IDs' });
  }

  if (ids.length === 0) {
    return { message: 'No notifications to mark as read' };
  }

  await db.update(notifications)
    .set({ isRead: true })
    .where(inArray(notifications.id, ids));

  return { message: 'Notifications marked as read' };
});