import { db } from '~~/server/utils/db';
import { supportTickets } from '~~/server/db/schema';

export default defineEventHandler(async (event) => {
  const { subject, message, userId } = await readBody(event);

  if (!subject || !message || !userId) {
    throw createError({ statusCode: 400, statusMessage: 'Missing required fields' });
  }

  const newTicket = await db.insert(supportTickets).values({
    subject,
    message,
    userId,
  }).returning();

  return newTicket[0];
});