import { db } from '../../../../utils/db';
import { auditLogs } from '../../../../db/schema';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  const assessorId = event.context.params?.id;
  if (!assessorId) {
    throw createError({ statusCode: 400, statusMessage: 'Missing assessor ID' });
  }

  const audits = await db.query.auditLogs.findMany({
    where: eq(auditLogs.userId, assessorId),
    with: {
      application: {
        with: {
          organization: true,
        },
      },
    },
  });

  return audits;
});