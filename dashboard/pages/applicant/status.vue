<template>
  <div>
    <PageHeader title="Application Status Tracker" :breadcrumbs="[{label: 'Dashboard', to: '/dashboard'}, {label: 'Status'}]" />
    <UCard>
      <div class="mb-4">
        <h3 class="text-xl font-semibold mb-6">Current Progress: <span class="text-primary-600">APP-2026-004</span></h3>
        <TimelineStatus :status="currentDbStatus" />
      </div>
      
      <div class="space-y-4 mt-12 bg-gray-50 dark:bg-gray-800 p-6 rounded-lg pointer-events-none opacity-80 border border-gray-200 dark:border-gray-700 shadow-inner">
        <h4 class="font-bold text-gray-700 dark:text-gray-300">Latest Updates Console</h4>
        <div class="flex gap-4 items-start bg-white dark:bg-gray-900 p-4 rounded border border-gray-100 dark:border-gray-800">
          <UIcon name="i-heroicons-check-circle" class="w-8 h-8 text-green-500" />
          <div>
            <p class="font-semibold text-gray-900 dark:text-white">Review Completed</p>
            <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">Your application review has been completed by assigned reviewers and verified strictly by the Assessor board.</p>
          </div>
        </div>
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import PageHeader from '~/components/shared/PageHeader.vue'
import TimelineStatus from '~/components/shared/TimelineStatus.vue'

// Dummy representation
const currentDbStatus = ref('REVIEWED')
</script>
