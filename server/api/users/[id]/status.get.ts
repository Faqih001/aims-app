import { db } from '~~/server/utils/db';
import { applications } from '~~/server/db/schema';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  const userId = event.context.params?.id;
  if (!userId) {
    throw createError({ statusCode: 400, statusMessage: 'Missing user ID' });
  }

  const latestApplication = await db.query.applications.findFirst({
    where: eq(applications.applicantId, userId),
    orderBy: (applications, { desc }) => [desc(applications.createdAt)],
    with: {
      organization: {
        columns: {
          name: true,
        },
      },
    },
  });

  return latestApplication;
});