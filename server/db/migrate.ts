import { migrate } from 'drizzle-orm/neon-http/migrator'
import { db } from './drizzle'

await migrate(db, { migrationsFolder: './server/db/migrations' })
