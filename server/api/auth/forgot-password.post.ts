import { z } from 'zod'
import { getUserByEmail } from '../../utils/db'

const schema = z.object({
  email: z.string().email(),
})

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const validation = schema.safeParse(body)
  if (!validation.success) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid input' })
  }

  const { email } = validation.data

  const user = await getUserByEmail(email)
  if (!user) {
    // Return success to avoid user enumeration attacks
    return { success: true, message: 'If an account with that email exists, we sent a password reset link.' }
  }

  // Generate a reset token (Mocking this for now, in a real app you save to DB)
  // const resetToken = jwt.sign({ userId: user.id }, jwtSecret, { expiresIn: '1h' })
  // await sendResetEmail(user.email, resetToken)

  return {
    success: true,
    message: 'If an account with that email exists, we sent a password reset link.',
  }
})
