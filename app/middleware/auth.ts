
export default defineNuxtRouteMiddleware(async (to, from) => {
  const authStore = useAuthStore()

  // Ensure user is fetched if not loaded but token exists
  if (!authStore.isAuthenticated) {
    await authStore.fetchUser()
  }

  const isDashboardRoute = to.path.startsWith('/dashboard')

  // If unauthenticated and entering dashboard -> go to login
  if (isDashboardRoute && !authStore.isAuthenticated) {
    return navigateTo('/auth/login')
  }

  // Role-Based Access Control logic for dashboard routes
  if (isDashboardRoute && authStore.isAuthenticated) {
    const userRole = authStore.user?.role

    if (to.path.startsWith('/dashboard/admin') && userRole !== 'SYSTEM_ADMIN') {
      return navigateTo('/dashboard/applicant')
    }
    if (to.path.startsWith('/dashboard/assessor') && userRole !== 'ASSESSOR' && userRole !== 'SYSTEM_ADMIN') {
      return navigateTo('/dashboard/applicant')
    }
    if (to.path.startsWith('/dashboard/reviewer') && userRole !== 'TECHNICAL_REVIEWER' && userRole !== 'SYSTEM_ADMIN') {
      return navigateTo('/dashboard/applicant')
    }
  }
})
