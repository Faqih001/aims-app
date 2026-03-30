import { db } from '~/server/utils/db';
import { users } from '~/server/db/schema';
import { z } from 'zod';

const createUserSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  role: z.enum(['SYSTEM_ADMIN', 'ASSESSOR', 'APPLICANT', 'TECHNICAL_REVIEWER']),
});

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const parsedBody = createUserSchema.safeParse(body);

  if (!parsedBody.success) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid request body',
      data: parsedBody.error.errors,
    });
  }

  const newUser = await db.insert(users).values(parsedBody.data).returning();
  return newUser[0];
});
