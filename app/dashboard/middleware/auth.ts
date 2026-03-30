import { useAuthStore } from '../stores/auth'

export default defineNuxtRouteMiddleware(async (to) => {
  if (process.server) return

  const authStore = useAuthStore()
  const publicRoutes = ['/dashboard/login', '/dashboard/register', '/dashboard/forgot-password']

  // If user is not authenticated, fetch user data
  if (!authStore.isAuthenticated) {
    await authStore.fetchUser()
  }

  const isPublicRoute = publicRoutes.includes(to.path)

  // If the route is protected and user is not authenticated, redirect to login
  if (!isPublicRoute && !authStore.isAuthenticated) {
    return navigateTo('/dashboard/login')
  }

  // If the route is public (login/register) and user is authenticated, redirect to dashboard
  if (isPublicRoute && authStore.isAuthenticated) {
    return navigateTo('/dashboard')
  }
})
