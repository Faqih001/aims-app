import { db } from '../../../utils/db';
import { notifications } from '../../../db/schema';

export default defineEventHandler(async () => {
  await db.update(notifications).set({ read: 'true' });
  return { message: 'All notifications marked as read' };
});
