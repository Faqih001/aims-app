import { z } from 'zod'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { getUserByEmail, createUser } from '../../utils/db'

const { jwtSecret } = useRuntimeConfig()

const schema = z.object({
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(8),
    role: z.enum(['APPLICANT', 'ASSESSOR', 'TECHNICAL_REVIEWER']),
})

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    const validation = schema.safeParse(body)
    if (!validation.success) {
        throw createError({ statusCode: 400, statusMessage: 'Invalid input' })
    }

    const { name, email, password, role } = validation.data

    const existingUser = await getUserByEmail(email)
    if (existingUser) {
        throw createError({ statusCode: 409, statusMessage: 'User already exists' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = await createUser({
        name,
        email,
        password: hashedPassword,
        role,
    })

    const token = jwt.sign({ userId: newUser.id }, jwtSecret, { expiresIn: '7d' })

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userWithoutPassword } = newUser

    return {
        token,
        user: userWithoutPassword,
    }
})
