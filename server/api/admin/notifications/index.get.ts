import { db } from '~/server/db/drizzle';

export default defineEventHandler(async () => {
  const notifications = await db.query.notifications.findMany();
  return notifications;
});
