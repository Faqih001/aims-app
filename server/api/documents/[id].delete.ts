import { db } from '../../../utils/db';
import { documents } from '../../../db/schema';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  const documentId = event.context.params?.id;
  if (!documentId) {
    throw createError({ statusCode: 400, statusMessage: 'Missing document ID' });
  }

  await db.delete(documents).where(eq(documents.id, documentId));

  return { message: 'Document deleted' };
});