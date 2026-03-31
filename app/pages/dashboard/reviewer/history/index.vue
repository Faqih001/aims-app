<script setup lang="ts">
import { ref } from 'vue'

const columns = [
  { key: 'id', label: 'Reference' },
  { key: 'application', label: 'Assessed Entity' },
  { key: 'outcome', label: 'Your Decision' },
  { key: 'completedAt', label: 'Date Completed' },
  { key: 'actions', label: '' }
]

const historyLogs = ref([
  { id: 'REV-099', application: 'Global Tech Inc.', outcome: 'Approved', completedAt: '2025-12-01' },
  { id: 'REV-098', application: 'Alpha Services', outcome: 'Action Required', completedAt: '2025-11-15' },
  { id: 'REV-097', application: 'Beta Manufacturing', outcome: 'Rejected', completedAt: '2025-10-30' },
])

const colorMap: Record<string, string> = {
  'Approved': 'green',
  'Action Required': 'orange',
  'Rejected': 'red'
}
</script>
<template>
  <div class="space-y-6">
    <DashboardBreadcrumb :breadcrumbs="[{label: 'Reviewer', to: '/dashboard/reviewer'}, {label: 'History'}]" />
    <h1 class="text-3xl font-bold">Review History</h1>
    <p class="text-gray-500">A complete log of past application decisions and audits you have signed off on.</p>
    
    <UCard>
      <UTable :rows="historyLogs" :columns="columns">
        <template #outcome-data="{ row }">
          <UBadge :color="colorMap[row.outcome] || 'gray'" variant="soft">{{ row.outcome }}</UBadge>
        </template>
        <template #actions-data="{ row }">
          <UButton size="xs" variant="ghost" icon="i-heroicons-document-text" title="View Review Notes" />
        </template>
      </UTable>
    </UCard>
  </div>
</template>
