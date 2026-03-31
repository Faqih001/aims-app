import { db } from '~~/server/utils/db';
import { documents } from '~~/server/db/schema';

export default defineEventHandler(async (event) => {
  const { name, url, type, applicationId } = await readBody(event);

  if (!name || !url || !applicationId) {
    throw createError({ statusCode: 400, statusMessage: 'Missing required fields' });
  }

  const newDocument = await db.insert(documents).values({
    name,
    url,
    type: type ?? 'OTHER',
    applicationId,
  }).returning();

  return newDocument[0];
});