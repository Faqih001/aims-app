import { db } from '~~/server/utils/db';
import { assessmentMetrics } from '~~/server/db/schema';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  const assessorId = event.context.params?.id;
  if (!assessorId) {
    throw createError({ statusCode: 400, statusMessage: 'Missing assessor ID' });
  }

  const metrics = await db.query.assessmentMetrics.findFirst({
    where: eq(assessmentMetrics.assessorId, assessorId),
  });

  return metrics ?? {
    assessorId,
    totalAssessments: 0,
    completionRate: 0,
    averageScore: null,
  };
});