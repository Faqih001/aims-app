<script setup lang="ts">
import { ref } from 'vue'

const historyLogs = ref([
  { id: 'REV-099', application: 'Global Tech Inc.', outcome: 'Approved', completedAt: '2025-12-01' },
  { id: 'REV-098', application: 'Alpha Services', outcome: 'Action Required', completedAt: '2025-11-15' },
])
</script>
<template>
  <div class="space-y-6">
    <DashboardBreadcrumb :breadcrumbs="[{label: 'Reviewer', to: '/dashboard/reviewer'}, {label: 'History'}]" />
    <h1 class="text-3xl font-bold">Past Decisions</h1>
    <UCard>
      <UTable :rows="historyLogs" />
    </UCard>
  </div>
</template>
