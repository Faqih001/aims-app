<script setup lang="ts">

const sidebarStore = useSidebarStore()
const authStore = useAuthStore()

const adminLinks = [
  { icon: 'i-heroicons-user-group', label: 'Users', to: '/dashboard/admin/users' },
  { icon: 'i-heroicons-academic-cap', label: 'Accreditations', to: '/dashboard/admin/accreditations' },
  { icon: 'i-heroicons-briefcase', label: 'Assessors', to: '/dashboard/admin/assessors' },
  { icon: 'i-heroicons-magnifying-glass', label: 'Reviewers', to: '/dashboard/admin/reviewers' },
  { icon: 'i-heroicons-document-check', label: 'Applications', to: '/dashboard/admin/applications' },
  { icon: 'i-heroicons-clipboard-document-check', label: 'Audits', to: '/dashboard/admin/audits' },
  { icon: 'i-heroicons-chart-bar', label: 'Reports', to: '/dashboard/admin/reports' },
  { icon: 'i-heroicons-currency-dollar', label: 'Billing', to: '/dashboard/admin/billing' },
  { icon: 'i-heroicons-document-text', label: 'Invoices', to: '/dashboard/admin/invoices' },
  { icon: 'i-heroicons-credit-card', label: 'Payments', to: '/dashboard/admin/payments' },
  { icon: 'i-heroicons-cog', label: 'Settings', to: '/dashboard/admin/settings' },
  { icon: 'i-heroicons-archive-box', label: 'Logs', to: '/dashboard/admin/logs' },
]

const assessorLinks = [
  { icon: 'i-heroicons-clipboard-document-list', label: 'Assignments', to: '/dashboard/assessor/assignments' },
  { icon: 'i-heroicons-document-check', label: 'Applications', to: '/dashboard/assessor/applications' },
  { icon: 'i-heroicons-clipboard-document-check', label: 'Audits', to: '/dashboard/assessor/audits' },
  { icon: 'i-heroicons-folder', label: 'Documents', to: '/dashboard/assessor/documents' },
  { icon: 'i-heroicons-chat-bubble-left-right', label: 'Messages', to: '/dashboard/assessor/messages' },
  { icon: 'i-heroicons-chat-bubble-bottom-center-text', label: 'Feedback', to: '/dashboard/assessor/feedback' },
  { icon: 'i-heroicons-chart-pie', label: 'Reports', to: '/dashboard/assessor/reports' },
  { icon: 'i-heroicons-calendar-days', label: 'Schedule', to: '/dashboard/assessor/schedule' },
]

const applicantLinks = [
  { icon: 'i-heroicons-document-plus', label: 'Applications', to: '/dashboard/applicant/applications' },
  { icon: 'i-heroicons-presentation-chart-line', label: 'Status', to: '/dashboard/applicant/status' },
  { icon: 'i-heroicons-clipboard-document-check', label: 'Audits', to: '/dashboard/applicant/audits' },
  { icon: 'i-heroicons-folder', label: 'Documents', to: '/dashboard/applicant/documents' },
  { icon: 'i-heroicons-currency-dollar', label: 'Billing', to: '/dashboard/applicant/billing' },
  { icon: 'i-heroicons-document-text', label: 'Invoices', to: '/dashboard/applicant/invoices' },
  { icon: 'i-heroicons-credit-card', label: 'Payments', to: '/dashboard/applicant/payments' },
  { icon: 'i-heroicons-chat-bubble-left-right', label: 'Feedback', to: '/dashboard/applicant/feedback' },
]

const reviewerLinks = [
  { icon: 'i-heroicons-clipboard-document-list', label: 'Assignments', to: '/dashboard/reviewer/assignments' },
  { icon: 'i-heroicons-document-check', label: 'Applications', to: '/dashboard/reviewer/applications' },
  { icon: 'i-heroicons-clipboard-document-check', label: 'Audits', to: '/dashboard/reviewer/audits' },
  { icon: 'i-heroicons-folder', label: 'Documents', to: '/dashboard/reviewer/documents' },
  { icon: 'i-heroicons-clock', label: 'History', to: '/dashboard/reviewer/history' },
  { icon: 'i-heroicons-chat-bubble-left-right', label: 'Messages', to: '/dashboard/reviewer/messages' },
  { icon: 'i-heroicons-chat-bubble-bottom-center-text', label: 'Feedback', to: '/dashboard/reviewer/feedback' },
  { icon: 'i-heroicons-calendar-days', label: 'Schedule', to: '/dashboard/reviewer/schedule' },
  { icon: 'i-heroicons-chart-pie', label: 'Reports', to: '/dashboard/reviewer/reports' },
]

const generalLinks = computed(() => {
  let prefix = '/dashboard/applicant';
  if (authStore.isAdmin) prefix = '/dashboard/admin';
  else if (authStore.isAssessor) prefix = '/dashboard/assessor';
  else if (authStore.isReviewer) prefix = '/dashboard/reviewer';

  return [
    { icon: 'i-heroicons-user-circle', label: 'Profile', to: `${prefix}/profile` },
    { icon: 'i-heroicons-bell', label: 'Notifications', to: `${prefix}/notifications` },
    { icon: 'i-heroicons-cog', label: 'Settings', to: `${prefix}/settings` },
    { icon: 'i-heroicons-question-mark-circle', label: 'Help', to: `${prefix}/help` },
    { icon: 'i-heroicons-lifebuoy', label: 'Support', to: `${prefix}/support` },
  ];
})

// Close mobile sidebar on route change
const route = useRoute()
watch(() => route.path, () => {
  sidebarStore.setMobile(false)
})
</script>

<template>
  <div
    class="flex flex-col justify-between h-full bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 transition-all duration-300 fixed md:relative z-40 border-r border-gray-200 dark:border-gray-700"
    :class="[
      sidebarStore.isCollapsed ? 'md:w-20 w-64' : 'w-64',
      sidebarStore.isOpenMobile ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
    ]"
  >
    <div class="flex-1 overflow-y-auto custom-scrollbar">
      <div class="flex items-center justify-center h-20 border-b border-gray-200 dark:border-gray-700">
        <AppLogo :class="{ 'md:hidden': sidebarStore.isCollapsed }" />
      </div>
      <nav class="mt-4">
        <NuxtLink
          to="/dashboard"
          class="flex items-center px-6 py-3 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <UIcon name="i-heroicons-home" class="h-6 w-6 shrink-0" />
          <span class="mx-4 whitespace-nowrap" :class="{ 'md:hidden': sidebarStore.isCollapsed }">Dashboard</span>
        </NuxtLink>

        <template v-if="authStore.isAdmin">
            <NuxtLink v-for="link in adminLinks" :key="link.to" :to="link.to" class="flex items-center px-6 py-3 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700">
                <UIcon :name="link.icon" class="h-6 w-6 shrink-0" />
                <span class="mx-4 whitespace-nowrap" :class="{ 'md:hidden': sidebarStore.isCollapsed }">{{ link.label }}</span>
            </NuxtLink>
        </template>
        <template v-if="authStore.isAssessor">
            <NuxtLink v-for="link in assessorLinks" :key="link.to" :to="link.to" class="flex items-center px-6 py-3 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700">
                <UIcon :name="link.icon" class="h-6 w-6 shrink-0" />
                <span class="mx-4 whitespace-nowrap" :class="{ 'md:hidden': sidebarStore.isCollapsed }">{{ link.label }}</span>
            </NuxtLink>
        </template>
        <template v-if="authStore.isApplicant">
            <NuxtLink v-for="link in applicantLinks" :key="link.to" :to="link.to" class="flex items-center px-6 py-3 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700">
                <UIcon :name="link.icon" class="h-6 w-6 shrink-0" />
                <span class="mx-4 whitespace-nowrap" :class="{ 'md:hidden': sidebarStore.isCollapsed }">{{ link.label }}</span>
            </NuxtLink>
        </template>
        <template v-if="authStore.isReviewer">
            <NuxtLink v-for="link in reviewerLinks" :key="link.to" :to="link.to" class="flex items-center px-6 py-3 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700">
                <UIcon :name="link.icon" class="h-6 w-6 shrink-0" />
                <span class="mx-4 whitespace-nowrap" :class="{ 'md:hidden': sidebarStore.isCollapsed }">{{ link.label }}</span>
            </NuxtLink>
        </template>

        <hr class="my-4 border-gray-200 dark:border-gray-700" />

        <NuxtLink v-for="link in generalLinks" :key="link.to" :to="link.to" class="flex items-center px-6 py-3 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700">
            <UIcon :name="link.icon" class="h-6 w-6 shrink-0" />
            <span class="mx-4 whitespace-nowrap" :class="{ 'md:hidden': sidebarStore.isCollapsed }">{{ link.label }}</span>
        </NuxtLink>

      </nav>
    </div>
    <div class="px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <UButton
            block
            color="amber"
            size="lg"
            class="flex items-center justify-center mb-4"
            @click="authStore.logout"
        >
            <UIcon name="i-heroicons-arrow-left-on-rectangle" class="h-6 w-6 shrink-0" />
            <span :class="{ 'md:hidden': sidebarStore.isCollapsed }">Logout</span>
        </UButton>
        <button
            class="w-full hidden md:flex items-center justify-center p-2 rounded-md bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
            @click="sidebarStore.toggle()"
        >
            <UIcon :name="sidebarStore.isCollapsed ? 'i-heroicons-chevron-right' : 'i-heroicons-chevron-left'" class="h-6 w-6 text-gray-600 dark:text-gray-300" />
        </button>
    </div>
  </div>

  <!-- Mobile Overlay -->
  <div 
    v-if="sidebarStore.isOpenMobile" 
    class="fixed inset-0 bg-black/50 z-30 md:hidden"
    @click="sidebarStore.setMobile(false)"
  ></div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #cbd5e1;
  border-radius: 20px;
}
.dark .custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #475569;
}
</style>
