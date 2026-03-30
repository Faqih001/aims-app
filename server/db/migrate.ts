import { migrate } from 'drizzle-orm/neon-http/migrator'
import { db } from '~/server/db/drizzle'

await migrate(db, { migrationsFolder: './server/db/migrations' })
