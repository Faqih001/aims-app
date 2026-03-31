import { db } from '~~/server/utils/db';
import { invoices } from '~~/server/db/schema';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id;
  if (!id) throw createError({ statusCode: 400 });
  await db.delete(invoices).where(eq(invoices.id, id));
  return { success: true };
});
