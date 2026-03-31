import { db } from '~~/server/utils/db';
import { notifications } from '~~/server/db/schema';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  await db.update(notifications).set({ isRead: true }).where(eq(notifications.isRead, false));
  return { success: true };
});
