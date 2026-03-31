<template>
  <div>
    <PageHeader title="Application Status Tracker" :breadcrumbs="[{label: 'Dashboard', to: '/dashboard'}, {label: 'Status'}]" />
    <UCard>
      <div class="mb-8">
        <h3 class="text-lg font-semibold mb-6">Current Progress: APP-2026-004</h3>
        <TimelineStatus :status="currentDbStatus" />
      </div>
      
      <div class="space-y-4 mt-12 bg-gray-50 dark:bg-gray-800 p-6 rounded-lg pointer-events-none opacity-80">
        <h4 class="font-bold">Latest Updates</h4>
        <div class="flex gap-4 items-start">
          <UIcon name="i-heroicons-envelope" class="w-6 h-6 text-primary-500" />
          <div>
            <p class="font-semibold">Review Completed</p>
            <p class="text-sm text-gray-600">Your application review has been completed by assigned reviewers.</p>
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

// This would normally be fetched from /api/applications/[id]
const currentDbStatus = ref('REVIEWED')
</script>
