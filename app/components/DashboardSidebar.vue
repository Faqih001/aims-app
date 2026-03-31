<script setup lang="ts">
import { useSidebarStore } from '~/stores/sidebar'

const sidebarStore = useSidebarStore()
const authStore = useAuthStore()

const adminLinks = [
  { icon: 'i-heroicons-user-group', label: 'Users', to: '/dashboard/admin/users' },
  { icon: 'i-heroicons-academic-cap', label: 'Accreditations', to: '/dashboard/admin/accreditations' },
  { icon: 'i-heroicons-briefcase', label: 'Assessors', to: '/dashboard/admin/assessors' },
  { icon: 'i-heroicons-magnifying-glass', label: 'Reviewers', to: '/dashboard/admin/reviewers' },
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
  { icon: 'i-heroicons-chart-pie', label: 'Reports', to: '/dashboard/assessor/reports' },
  { icon: 'i-heroicons-calendar-days', label: 'Schedule', to: '/dashboard/assessor/schedule' },
]

const applicantLinks = [
  { icon: 'i-heroicons-document-plus', label: 'Applications', to: '/dashboard/applicant/applications' },
  { icon: 'i-heroicons-folder', label: 'Documents', to: '/dashboard/applicant/documents' },
  { icon: 'i-heroicons-presentation-chart-line', label: 'Status', to: '/dashboard/applicant/status' },
  { icon: 'i-heroicons-chat-bubble-left-right', label: 'Feedback', to: '/dashboard/applicant/feedback' },
]

const reviewerLinks = [
  { icon: 'i-heroicons-clipboard-document-list', label: 'Assignments', to: '/dashboard/reviewer/assignments' },
  { icon: 'i-heroicons-document-check', label: 'Applications', to: '/dashboard/reviewer/applications' },
  { icon: 'i-heroicons-chart-pie', label: 'Reports', to: '/dashboard/reviewer/reports' },
  { icon: 'i-heroicons-chat-bubble-left-right', label: 'Feedback', to: '/dashboard/reviewer/feedback' },
]

const generalLinks = [
    { icon: 'i-heroicons-user-circle', label: 'Profile', to: '/dashboard/profile' },
    { icon: 'i-heroicons-bell', label: 'Notifications', to: '/dashboard/notifications' },
    { icon: 'i-heroicons-question-mark-circle', label: 'Help', to: '/dashboard/help' },
    { icon: 'i-heroicons-lifebuoy', label: 'Support', to: '/dashboard/support' },
]

</script>

<template>
  <div
    class="flex flex-col justify-between h-full bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 transition-all duration-300"
    :class="sidebarStore.isCollapsed ? 'w-20' : 'w-64'"
  >
    <div>
      <div class="flex items-center justify-center h-20 border-b border-gray-200 dark:border-gray-700">
        <AppLogo :class="{ 'hidden': sidebarStore.isCollapsed }" />
      </div>
      <nav class="mt-4">
        <NuxtLink
          to="/dashboard"
          class="flex items-center px-6 py-3 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <UIcon name="i-heroicons-home" class="h-6 w-6" />
          <span class="mx-4" :class="{ 'hidden': sidebarStore.isCollapsed }">Dashboard</span>
        </NuxtLink>

        <template v-if="authStore.isAdmin">
            <NuxtLink v-for="link in adminLinks" :key="link.to" :to="link.to" class="flex items-center px-6 py-3 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700">
                <UIcon :name="link.icon" class="h-6 w-6" />
                <span class="mx-4" :class="{ 'hidden': sidebarStore.isCollapsed }">{{ link.label }}</span>
            </NuxtLink>
        </template>
        <template v-if="authStore.isAssessor">
            <NuxtLink v-for="link in assessorLinks" :key="link.to" :to="link.to" class="flex items-center px-6 py-3 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700">
                <UIcon :name="link.icon" class="h-6 w-6" />
                <span class="mx-4" :class="{ 'hidden': sidebarStore.isCollapsed }">{{ link.label }}</span>
            </NuxtLink>
        </template>
        <template v-if="authStore.isApplicant">
            <NuxtLink v-for="link in applicantLinks" :key="link.to" :to="link.to" class="flex items-center px-6 py-3 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700">
                <UIcon :name="link.icon" class="h-6 w-6" />
                <span class="mx-4" :class="{ 'hidden': sidebarStore.isCollapsed }">{{ link.label }}</span>
            </NuxtLink>
        </template>
        <template v-if="authStore.isReviewer">
            <NuxtLink v-for="link in reviewerLinks" :key="link.to" :to="link.to" class="flex items-center px-6 py-3 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700">
                <UIcon :name="link.icon" class="h-6 w-6" />
                <span class="mx-4" :class="{ 'hidden': sidebarStore.isCollapsed }">{{ link.label }}</span>
            </NuxtLink>
        </template>

        <hr class="my-4 border-gray-200 dark:border-gray-700" />

        <NuxtLink v-for="link in generalLinks" :key="link.to" :to="link.to" class="flex items-center px-6 py-3 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700">
            <UIcon :name="link.icon" class="h-6 w-6" />
            <span class="mx-4" :class="{ 'hidden': sidebarStore.isCollapsed }">{{ link.label }}</span>
        </NuxtLink>

      </nav>
    </div>
    <div class="px-6 py-4">
      <button
        class="w-full flex items-center justify-center p-2 rounded-md bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
        @click="sidebarStore.toggle()"
      >
        <UIcon :name="sidebarStore.isCollapsed ? 'i-heroicons-chevron-right' : 'i-heroicons-chevron-left'" class="h-6 w-6" />
      </button>
    </div>
  </div>
</template>
