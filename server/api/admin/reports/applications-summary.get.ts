import { db } from '~~/server/utils/db';

export default defineEventHandler(async () => {
  const applications = await db.query.applications.findMany({
    columns: {
      status: true,
      createdAt: true,
    },
  });

  return {
    totalApplications: applications.length,
    statuses: applications.map((app) => app.status),
  };
});