import { db } from '~~/server/db/drizzle';
import { accreditations } from '~~/server/db/schema';

export default defineEventHandler(async () => {
  const allAccreditations = await db.select().from(accreditations);
  return allAccreditations;
});
