import { db } from '~/server/db/drizzle';
import { assessments } from '~/server/db/schema';

export default defineEventHandler(async (event) => {
  try {
    const applicationId = event.context.params?.id;
    const body = await readBody(event);

    // Here you would also get the assessor's ID from the session
    const assessorId = '...'; // Replace with actual assessor ID

    const data = await db.insert(assessments).values({
      applicationId,
      assessorId,
      ...body,
    }).returning();

    // You might also want to update the application status here

    return {
      data,
    };
  } catch (error: any) {
    throw createError({
      statusCode: 400,
      statusMessage: error.message,
    });
  }
});