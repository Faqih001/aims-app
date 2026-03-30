import { db } from '~/server/utils/db';

export default defineEventHandler(async () => {
  const applications = await db.query.applications.findMany({
    with: {
      applicant: true,
      organization: true,
    }
  });
  return applications;
});
