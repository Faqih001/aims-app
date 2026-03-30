import { db } from '~/server/db/drizzle';

export default defineEventHandler(async () => {
  const accreditations = await db.query.accreditations.findMany();
  return accreditations;
});
