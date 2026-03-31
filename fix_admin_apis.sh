#!/bin/bash

# 1. Provide missing Revenue Report API referenced by Admin Dashboard
cat << 'TS' > server/api/admin/reports/revenue.get.ts
import { db } from '~~/server/utils/db';
import { payments } from '~~/server/db/schema';

export default defineEventHandler(async () => {
  const allPayments = await db.select().from(payments);
  return {
    totalRevenue: allPayments.reduce((acc, p) => acc + (parseFloat(p.amount) || 0), 0),
    payments: allPayments
  };
});
TS

# 2. Add complete missing endpoint for single users since frontend maps `/api/users/[id]` sometimes instead of `/admin`
mkdir -p server/api/users/[id]
cat << 'TS' > server/api/users/[id]/get.ts
import { db } from '~~/server/utils/db';
import { users } from '~~/server/db/schema';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id;
  if (!id) throw createError({ statusCode: 400, statusMessage: 'ID missing' });
  const user = await db.select().from(users).where(eq(users.id, id)).limit(1);
  return user[0] || {};
});
TS

cat << 'TS' > server/api/users/[id]/put.ts
import { db } from '~~/server/utils/db';
import { users } from '~~/server/db/schema';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id;
  if (!id) throw createError({ statusCode: 400, statusMessage: 'ID missing' });
  const body = await readBody(event);
  await db.update(users).set({ ...body, updatedAt: new Date() }).where(eq(users.id, id));
  return { success: true };
});
TS

# 3. Add Missing notification updates (Put individual + Read-All)
mkdir -p server/api/admin/notifications
cat << 'TS' > server/api/admin/notifications/[id].put.ts
import { db } from '~~/server/utils/db';
import { notifications } from '~~/server/db/schema';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id;
  if (!id) return;
  await db.update(notifications).set({ isRead: true }).where(eq(notifications.id, id));
  return { success: true };
});
TS
cat << 'TS' > server/api/admin/notifications/read-all.put.ts
import { db } from '~~/server/utils/db';
import { notifications } from '~~/server/db/schema';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  await db.update(notifications).set({ isRead: true }).where(eq(notifications.isRead, false));
  return { success: true };
});
TS

# 4. Add missing Audit endpoints since `admin/logs/index.vue` explicitly calls `$fetch('/api/admin/audits')`
cat << 'TS' > server/api/admin/audits/[id].put.ts
import { db } from '~~/server/utils/db';
import { auditLogs } from '~~/server/db/schema';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id;
  if (!id) throw createError({ statusCode: 400, statusMessage: 'ID missing' });
  const body = await readBody(event);
  await db.update(auditLogs).set(body).where(eq(auditLogs.id, id));
  return { success: true };
});
TS

cat << 'TS' > server/api/admin/audits/[id].delete.ts
import { db } from '~~/server/utils/db';
import { auditLogs } from '~~/server/db/schema';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id;
  if (!id) throw createError({ statusCode: 400, statusMessage: 'ID missing' });
  await db.delete(auditLogs).where(eq(auditLogs.id, id));
  return { success: true };
});
TS

# 5. Add Billings/Payments CRUD missing actions
cat << 'TS' > server/api/admin/billing/[id].put.ts
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
TS

cat << 'TS' > server/api/admin/billing/[id].delete.ts
import { db } from '~~/server/utils/db';
import { invoices } from '~~/server/db/schema';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id;
  if (!id) throw createError({ statusCode: 400 });
  await db.delete(invoices).where(eq(invoices.id, id));
  return { success: true };
});
TS
