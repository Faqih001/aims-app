import { db } from '~~/server/utils/db';

export default defineEventHandler(async () => {
  const audits = await db.query.auditLogs.findMany({
    with: {
      user: {
        columns: {
          name: true,
          role: true,
        },
      },
    },
    orderBy: (logs, { desc }) => [desc(logs.timestamp)],
  });
  return audits;
});
