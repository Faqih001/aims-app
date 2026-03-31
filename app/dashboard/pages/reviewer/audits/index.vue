<script setup lang="ts">
import { ref } from 'vue'

const audits = ref([
  { id: 'AUD-01', entity: 'Beta Corp', type: 'Surveillance', date: '2026-01-10', result: 'Pass' },
  { id: 'AUD-02', entity: 'Delta Systems', type: 'Initial', date: '2026-02-22', result: 'Conditional Pass' }
])
</script>

<template>
  <div class="space-y-6">
    <DashboardBreadcrumb :breadcrumbs="[{label: 'Reviewer', to: '/dashboard/reviewer'}, {label: 'Audits'}]" />
    <h1 class="text-3xl font-bold flex items-center gap-3">
      Audit Ledgers
      <UIcon name="i-heroicons-clipboard-document-list" class="w-8 h-8 text-primary" />
    </h1>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <UCard>
        <p class="text-sm font-medium text-gray-500">Total Audits</p>
        <p class="text-3xl font-bold mt-2">124</p>
      </UCard>
      <UCard>
        <p class="text-sm font-medium text-gray-500">Passed This Year</p>
        <p class="text-3xl font-bold mt-2 text-green-600">89</p>
      </UCard>
      <UCard>
        <p class="text-sm font-medium text-gray-500">Pending Follow-ups</p>
        <p class="text-3xl font-bold mt-2 text-orange-500">14</p>
      </UCard>
    </div>

    <UCard>
      <UTable :rows="audits">
        <template #result-data="{ row }">
          <UBadge :color="row.result === 'Pass' ? 'green' : 'yellow'" variant="soft">{{ row.result }}</UBadge>
        </template>
      </UTable>
    </UCard>
  </div>
</template>
