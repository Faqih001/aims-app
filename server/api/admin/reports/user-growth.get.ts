import { db } from '~~/server/utils/db';

export default defineEventHandler(async () => {
  const users = await db.query.users.findMany({
    columns: {
      createdAt: true,
    },
  });

  return {
    totalUsers: users.length,
    createdAt: users.map((user) => user.createdAt),
  };
});