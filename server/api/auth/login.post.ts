import { z } from 'zod'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { getUserByEmail, createUser } from '~/server/utils/db'

const { jwtSecret } = useRuntimeConfig()

const schema = z.object({
    email: z.string().email(),
    password: z.string(),
})

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    const validation = schema.safeParse(body)
    if (!validation.success) {
        throw createError({ statusCode: 400, statusMessage: 'Invalid input' })
    }

    const { email, password } = validation.data

    const user = await getUserByEmail(email)
    if (!user) {
        throw createError({ statusCode: 401, statusMessage: 'Invalid credentials' })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
        throw createError({ statusCode: 401, statusMessage: 'Invalid credentials' })
    }

    const token = jwt.sign({ userId: user.id }, jwtSecret, { expiresIn: '7d' })

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userWithoutPassword } = user

    return {
        token,
        user: userWithoutPassword,
    }
})
