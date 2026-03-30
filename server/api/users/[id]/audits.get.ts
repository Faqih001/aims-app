import { db } from '../../../../utils/db';
import { auditLogs, applications } from '../../../../db/schema';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  const userId = event.context.params?.id;
  if (!userId) {
    throw createError({ statusCode: 400, statusMessage: 'Missing user ID' });
  }

  // Find applications for the user
  const userApplications = await db.query.applications.findMany({
    where: eq(applications.applicantId, userId),
    columns: {
      id: true,
    },
  });

  if (userApplications.length === 0) {
    return [];
  }

  const applicationIds = userApplications.map(app => app.id);

  const userAudits = await db.query.auditLogs.findMany({
    where: (auditLogs, { inArray }) => inArray(auditLogs.applicationId, applicationIds),
    with: {
      application: {
        with: {
          organization: {
            columns: {
              name: true,
            },
          },
        },
      },
      user: {
        columns: {
          fullName: true,
        },
      },
    },
  });

  return userAudits;
});