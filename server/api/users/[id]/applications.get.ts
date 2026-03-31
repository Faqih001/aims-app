import { db } from '~~/server/utils/db';
import { applications } from '~~/server/db/schema';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  const userId = event.context.params?.id;
  if (!userId) {
    throw createError({ statusCode: 400, statusMessage: 'Missing user ID' });
  }
  const userApplications = await db.query.applications.findMany({
    where: eq(applications.applicantId, userId),
    with: {
      organization: {
        columns: {
          name: true,
        },
      },
    }
  });
  return userApplications;
});
