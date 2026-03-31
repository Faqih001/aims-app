import { db } from '~~/server/utils/db';
import { schedules } from '~~/server/db/schema';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  const assessorId = event.context.params?.id;
  if (!assessorId) {
    throw createError({ statusCode: 400, statusMessage: 'Missing assessor ID' });
  }

  const assessorSchedule = await db.query.schedules.findMany({
    where: eq(schedules.assessorId, assessorId),
    with: {
      application: {
        with: {
          organization: true,
        },
      },
    },
  });

  return assessorSchedule;
});