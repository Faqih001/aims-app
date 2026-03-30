import { db } from '../../../../utils/db';
import { assessments } from '../../../../db/schema';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  const assessorId = event.context.params?.id;
  if (!assessorId) {
    throw createError({ statusCode: 400, statusMessage: 'Missing assessor ID' });
  }

  const feedback = await db.query.assessments.findMany({
    where: eq(assessments.userId, assessorId),
    with: {
      application: {
        with: {
          organization: true,
        },
      },
    },
  });

  return feedback;
});