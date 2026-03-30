import { db } from '../../../../utils/db';
import { applicationAssignments } from '../../../../db/schema';
import { eq, and } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  const reviewerId = event.context.params?.id;
  if (!reviewerId) {
    throw createError({ statusCode: 400, statusMessage: 'Missing reviewer ID' });
  }

  const assignments = await db.query.applicationAssignments.findMany({
    where: and(
      eq(applicationAssignments.assessorId, reviewerId),
      eq(applicationAssignments.role, 'TECHNICAL_REVIEWER')
    ),
    with: {
      application: {
        with: {
          applicant: true,
          organization: true,
        },
      },
    },
  });

  return assignments.map((assignment) => assignment.application);
});