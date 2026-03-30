import { db } from '../../../utils/db';
import { assessments } from '../../../db/schema';

export default defineEventHandler(async (event) => {
  const { applicationId, userId, notes, outcome } = await readBody(event);

  if (!applicationId || !userId || !notes || !outcome) {
    throw createError({ statusCode: 400, statusMessage: 'Missing required fields' });
  }

  const newFeedback = await db.insert(assessments).values({
    applicationId,
    userId,
    notes,
    outcome,
  }).returning();

  return newFeedback[0];
});