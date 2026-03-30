import { db } from '~/server/db/drizzle';
import { users } from '~/server/db/schema';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async () => {
  const assessors = await db.query.users.findMany({
    where: eq(users.role, 'ASSESSOR'),
  });
  return assessors;
});
