import { db } from '~~/server/utils/db';

export default defineEventHandler(async (event) => {
  const items = await db.query.users.findMany();
  return items;
});
