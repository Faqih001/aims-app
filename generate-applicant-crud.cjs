const fs = require('fs');
const path = require('path');

const entities = [
  { name: 'billing', table: 'payments' },
  { name: 'feedback', table: 'reviews' },
  { name: 'invoices', table: 'invoices' },
  { name: 'profile', table: 'users' },
  { name: 'applications', table: 'applications' },
  { name: 'help', table: 'supportTickets' },
  { name: 'payments', table: 'payments' },
  { name: 'audits', table: 'auditLogs' },
  { name: 'documents', table: 'documents' },
  { name: 'support', table: 'supportTickets' },
  { name: 'status', table: 'applications' },
  { name: 'notifications', table: 'notifications' },
  { name: 'settings', table: 'users' }
];

const basePath = path.join(__dirname, 'server', 'api', 'applicant');

entities.forEach(entity => {
  const dir = path.join(basePath, entity.name);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  const indexGet = `import { db } from '~~/server/utils/db';

export default defineEventHandler(async (event) => {
  // Add authentication and get applicant ID
  // const user = event.context.user;
  const items = await db.query.${entity.table}.findMany({
    // where: (table, { eq }) => eq(table.userId, user.id)
  });
  return items;
});
`;
  fs.writeFileSync(path.join(dir, 'index.get.ts'), indexGet);

  const indexPost = `import { db } from '~~/server/utils/db';
import { ${entity.table} } from '~~/server/db/schema';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const result = await db.insert(${entity.table}).values(body).returning();
  return result[0];
});
`;
  fs.writeFileSync(path.join(dir, 'index.post.ts'), indexPost);

  const idGet = `import { db } from '~~/server/utils/db';
import { eq } from 'drizzle-orm';
import { ${entity.table} } from '~~/server/db/schema';

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id');
  const result = await db.query.${entity.table}.findFirst({
    where: eq(${entity.table}.id, id)
  });
  return result;
});
`;
  fs.writeFileSync(path.join(dir, '[id].get.ts'), idGet);

  const idPut = `import { db } from '~~/server/utils/db';
import { eq } from 'drizzle-orm';
import { ${entity.table} } from '~~/server/db/schema';

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id');
  const body = await readBody(event);
  const result = await db.update(${entity.table}).set(body).where(eq(${entity.table}.id, id)).returning();
  return result[0];
});
`;
  fs.writeFileSync(path.join(dir, '[id].put.ts'), idPut);

  const idDelete = `import { db } from '~~/server/utils/db';
import { eq } from 'drizzle-orm';
import { ${entity.table} } from '~~/server/db/schema';

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id');
  const result = await db.delete(${entity.table}).where(eq(${entity.table}.id, id)).returning();
  return result[0];
});
`;
  fs.writeFileSync(path.join(dir, '[id].delete.ts'), idDelete);
});
console.log('Applicant CRUD APIs generated!');
