import { db } from '~/server/db/drizzle';
import { notifications } from '~/server/db/schema';

export default defineEventHandler(async () => {
  await db.update(notifications).set({ read: 'true' });
  return { success: true };
});
