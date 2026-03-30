import jwt from 'jsonwebtoken'
import { db } from '~/server/utils/db'
import { users } from '~/server/db/schema'
import { eq } from 'drizzle-orm'

const { jwtSecret } = useRuntimeConfig()

export default defineEventHandler(async (event) => {
    const authHeader = getHeader(event, 'Authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
    }

    const token = authHeader.substring(7)

    try {
        const decoded = jwt.verify(token, jwtSecret) as { userId: string }

        const user = await db.query.users.findFirst({
            where: eq(users.id, decoded.userId),
        })

        if (!user) {
            throw createError({ statusCode: 404, statusMessage: 'User not found' })
        }

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...userWithoutPassword } = user

        return {
            user: userWithoutPassword,
        }
    } catch (error) {
        throw createError({ statusCode: 401, statusMessage: 'Invalid token' })
    }
})
