import { z } from 'zod'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { getUserByEmail, createUser } from '../../utils/db'

const { jwtSecret } = useRuntimeConfig()

import { db } from '../../utils/db'
import { organizations } from '../../db/schema'

const schema = z.object({
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(8),
    role: z.enum(['APPLICANT', 'ASSESSOR', 'TECHNICAL_REVIEWER']),
    organizationName: z.string().optional()
})

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    const validation = schema.safeParse(body)
    if (!validation.success) {
        throw createError({ statusCode: 400, statusMessage: 'Invalid input' })
    }

    const { name, email, password, role, organizationName } = validation.data

    const existingUser = await getUserByEmail(email)
    if (existingUser) {
        throw createError({ statusCode: 409, statusMessage: 'User already exists' })
    }

    let orgId = null
    if (role === 'APPLICANT' && organizationName) {
        // Simple logic to create an organization 
        // Need to pass registration_number or it'll fail. But registrationNumber is required and unique!
        // We'll generate a dummy one for now if it's missing, since the form didn't capture it.
        const [org] = await db.insert(organizations).values({
            name: organizationName,
            registrationNumber: `REG-${Date.now()}`,
            contactEmail: email,
        }).returning()
        orgId = org.id
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = await createUser({
        name,
        email,
        password: hashedPassword,
        role,
        organizationId: orgId
    })

    const token = jwt.sign({ userId: newUser.id }, jwtSecret, { expiresIn: '7d' })

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userWithoutPassword } = newUser

    return {
        token,
        user: userWithoutPassword,
    }
})
