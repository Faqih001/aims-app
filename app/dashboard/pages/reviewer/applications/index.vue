<script setup lang="ts">
import { ref } from 'vue'

const columns = [
  { key: 'appId', label: 'Application ID' },
  { key: 'applicantName', label: 'Applicant Name' },
  { key: 'submissionDate', label: 'Submission Date' },
  { key: 'status', label: 'Status' },
  { key: 'priority', label: 'Priority' },
  { key: 'actions', label: 'Actions' }
]

const applications = ref([
  { id: 1, appId: 'APP-2026-001', applicantName: 'Tech Innovators Ltd', submissionDate: '2026-03-15', status: 'Pending Review', priority: 'High' },
  { id: 2, appId: 'APP-2026-042', applicantName: 'Global Services Co', submissionDate: '2026-03-20', status: 'In Progress', priority: 'Medium' }
])

const getBadgeColor = (status: string) => {
  if (status === 'Pending Review') return 'yellow'
  if (status === 'In Progress') return 'blue'
  return 'gray'
}
</script>

<template>
  <div class="space-y-6">
    <DashboardBreadcrumb :breadcrumbs="[{label: 'Reviewer', to: '/dashboard/reviewer'}, {label: 'Applications'}]" />
    <div class="flex justify-between items-center">
      <h1 class="text-3xl font-bold">Assigned Applications</h1>
      <UInput icon="i-heroicons-magnifying-glass" placeholder="Search applications..." />
    </div>

    <UCard>
      <UTable :columns="columns" :rows="applications">
        <template #status-data="{ row }">
          <UBadge :color="getBadgeColor(row.status)" variant="subtle">{{ row.status }}</UBadge>
        </template>
        <template #priority-data="{ row }">
          <div class="flex items-center gap-2">
            <UIcon name="i-heroicons-flag" :class="row.priority === 'High' ? 'text-red-500' : 'text-orange-500'" />
            <span class="text-sm">{{ row.priority }}</span>
          </div>
        </template>
        <template #actions-data="{ row }">
          <UButton size="xs" :to="`/dashboard/reviewer/applications/${row.id}`" color="primary" variant="soft">View Details</UButton>
        </template>
      </UTable>
    </UCard>
  </div>
</template>
