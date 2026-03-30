import { db } from '~/server/utils/db';

export default defineEventHandler(async () => {
  const users = await db.query.users.findMany();
  return users;
});
