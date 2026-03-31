<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'

definePageMeta({
  middleware: 'auth'
})

const authStore = useAuthStore()

onMounted(() => {
    if (authStore.isAdmin) navigateTo('/dashboard/admin')
    else if (authStore.isAssessor) navigateTo('/dashboard/assessor')
    else if (authStore.isReviewer) navigateTo('/dashboard/reviewer')
    else navigateTo('/dashboard/applicant')
})
</script>
<template>
  <div class="flex items-center justify-center min-h-screen">
    <UIcon name="i-heroicons-arrow-path" class="w-8 h-8 animate-spin text-primary-500" />
    <span class="ml-3 text-lg text-gray-600 dark:text-gray-300">Loading dashboard...</span>
  </div>
</template>
