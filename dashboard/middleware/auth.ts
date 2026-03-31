export default defineNuxtRouteMiddleware(async (to, from) => {
  // Extract token from cookie (using a mock auth approach for now)
  const userRole = useCookie('userRole').value

  const isAuthRoute = to.path.startsWith('/auth')
  const isDashboardRoute = to.path.startsWith('/dashboard')

  // If unauthenticated and entering dashboard -> go to login
  if (isDashboardRoute && !userRole) {
    return navigateTo('/login')
  }

  // Role-Based Access Control logic
  if (isDashboardRoute && userRole) {
    if (to.path.startsWith('/dashboard/pages/admin') && userRole !== 'SYSTEM_ADMIN') {
      return navigateTo('/dashboard/pages/applicant') // Redirect unauthorised
    }
    if (to.path.startsWith('/dashboard/pages/assessor') && userRole !== 'ASSESSOR' && userRole !== 'SYSTEM_ADMIN') {
      return navigateTo('/dashboard/pages/applicant')
    }
    if (to.path.startsWith('/dashboard/pages/reviewer') && userRole !== 'TECHNICAL_REVIEWER' && userRole !== 'SYSTEM_ADMIN') {
      return navigateTo('/dashboard/pages/applicant')
    }
  }
})
