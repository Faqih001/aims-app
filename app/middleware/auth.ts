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
    if (to.path.startsWith('/dashboard/admin') && userRole !== 'SYSTEM_ADMIN') {
      return navigateTo('/dashboard/applicant') // Redirect unauthorised to applicant role
    }
    if (to.path.startsWith('/dashboard/assessor') && userRole !== 'ASSESSOR' && userRole !== 'SYSTEM_ADMIN') {
      return navigateTo('/dashboard/applicant')
    }
    if (to.path.startsWith('/dashboard/reviewer') && userRole !== 'TECHNICAL_REVIEWER' && userRole !== 'SYSTEM_ADMIN') {
      return navigateTo('/dashboard/applicant')
    }
  }
})
