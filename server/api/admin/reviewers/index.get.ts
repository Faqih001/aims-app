import { db } from '../../../utils/db';
import { users } from '../../../db/schema';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async () => {
  const reviewers = await db.query.users.findMany({
    where: eq(users.role, 'TECHNICAL_REVIEWER'),
  });
  return reviewers;
});
