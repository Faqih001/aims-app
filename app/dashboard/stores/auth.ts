import { defineStore } from 'pinia'
import { z } from 'zod'

const UserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  role: z.enum(['SYSTEM_ADMIN', 'ASSESSOR', 'APPLICANT', 'TECHNICAL_REVIEWER']),
  name: z.string(),
  organizationId: z.string().uuid().optional().nullable(),
})

export type User = z.infer<typeof UserSchema>

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    token: null as string | null,
    isAuthenticated: false,
  }),
  getters: {
    isAdmin: (state) => state.user?.role === 'SYSTEM_ADMIN',
    isAssessor: (state) => state.user?.role === 'ASSESSOR',
    isApplicant: (state) => state.user?.role === 'APPLICANT',
    isReviewer: (state) => state.user?.role === 'TECHNICAL_REVIEWER',
  },
  actions: {
    async login(credentials: { email: string, password: any }) {
      try {
        const { token, user } = await $fetch('/api/auth/login', {
          method: 'POST',
          body: credentials,
        })

        const validatedUser = UserSchema.parse(user)
        this.token = token ?? null
        this.user = validatedUser
        this.isAuthenticated = true

        // Store token in a cookie for persistence
        const cookie = useCookie('auth-token')
        cookie.value = token
        
        navigateTo('/dashboard')
      } catch (error) {
        this.logout()
        throw error
      }
    },
    async register(data: any) {
        try {
          const { token, user } = await $fetch('/api/auth/register', {
            method: 'POST',
            body: data,
          })
  
          const validatedUser = UserSchema.parse(user)
          this.token = token ?? null
          this.user = validatedUser
          this.isAuthenticated = true
  
          // Store token in a cookie for persistence
          const cookie = useCookie('auth-token')
          cookie.value = token
          
          navigateTo('/dashboard')
        } catch (error) {
          this.logout()
          throw error
        }
      },
    logout() {
      this.user = null
      this.token = null
      this.isAuthenticated = false
      const cookie = useCookie('auth-token')
      cookie.value = null
      navigateTo('/dashboard/login')
    },
    async fetchUser() {
        const cookie = useCookie('auth-token')
        if (!cookie.value) {
            this.logout()
            return
        }

        if (this.isAuthenticated) {
            return
        }

      try {
        const { user } = await $fetch('/api/auth/user', {
          headers: {
            Authorization: `Bearer ${cookie.value}`,
          },
        })
        const validatedUser = UserSchema.parse(user)
        this.user = validatedUser
        this.isAuthenticated = true
        this.token = cookie.value ?? null
      } catch (error) {
        this.logout()
      }
    },
  },
})
