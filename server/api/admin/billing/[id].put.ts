import { db } from '~~/server/utils/db';
import { invoices } from '~~/server/db/schema';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id;
  if (!id) throw createError({ statusCode: 400 });
  const body = await readBody(event);
  await db.update(invoices).set(body).where(eq(invoices.id, id));
  return { success: true };
});
