import { db } from '../../utils/db';
import { users } from '../../db/schema';
import { eq } from 'drizzle-orm';
import { z } from 'zod';

const schema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  role: z.enum(['SYSTEM_ADMIN', 'ASSESSOR', 'APPLICANT', 'TECHNICAL_REVIEWER']).optional(),
});

export default defineEventHandler(async (event) => {
  const userId = event.context.params?.id;
  if (!userId) {
    throw createError({ statusCode: 400, statusMessage: 'Missing user ID' });
  }
  const body = await readBody(event);
  const validation = schema.safeParse(body);
  if (!validation.success) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid input' });
  }
  const [updatedUser] = await db.update(users).set(validation.data).where(eq(users.id, userId)).returning();
  return updatedUser;
});
