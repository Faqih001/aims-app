import { db } from '../../../utils/db';

export default defineEventHandler(async (event) => {
  const notifications = await db.query.notifications.findMany({
    orderBy: (notifications, { desc }) => [desc(notifications.time)],
  });
  return notifications;
});
