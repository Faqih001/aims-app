import { db } from '~~/server/utils/db';

export default defineEventHandler(async (event) => {
  // Add authentication and get applicant ID
  // const user = event.context.user;
  const items = await db.query.applications.findMany({
    // where: (table, { eq }) => eq(table.userId, user.id)
  });
  return items;
});
