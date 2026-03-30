import { db } from '../../../../utils/db';
import { applicationAssignments, applications } from '../../../../db/schema';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  const assessorId = event.context.params?.id;
  if (!assessorId) {
    throw createError({ statusCode: 400, statusMessage: 'Missing assessor ID' });
  }

  const assignments = await db.query.applicationAssignments.findMany({
    where: eq(applicationAssignments.assessorId, assessorId),
    with: {
      application: {
        with: {
          applicant: true,
          organization: true,
        },
      },
    },
  });

  return assignments.map(assignment => assignment.application);
});