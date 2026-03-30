import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import * as schema from '~/server/db/schema';
import { eq } from 'drizzle-orm';

const { neonApiKey, neonBranch, neonProjectId } = useRuntimeConfig()

const sql = neon({
    apiKey: neonApiKey,
    branch: neonBranch,
    projectId: neonProjectId,
});

export const db = drizzle(sql, { schema });

export async function getUserByEmail(email: string) {
    const user = await db.query.users.findFirst({
        where: eq(schema.users.email, email),
    });
    return user;
}

export async function createUser(data: typeof schema.users.$inferInsert) {
    const [newUser] = await db.insert(schema.users).values(data).returning();
    return newUser;
}
