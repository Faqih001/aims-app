import { db } from '~/server/db/drizzle';

export default defineEventHandler(async () => {
  const auditLogs = await db.query.auditLogs.findMany({
    with: {
      user: true,
    },
  });
  return auditLogs;
});
