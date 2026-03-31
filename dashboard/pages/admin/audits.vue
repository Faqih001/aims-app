<template>
  <div>
    <PageHeader title="Audit & System Logs" :breadcrumbs="[{label: 'Dashboard', to: '/dashboard'}, {label: 'Admin', to: '/dashboard/pages/admin'}, {label: 'Audit Logs'}]" />
    <UCard>
      <div class="mb-4 flex gap-4">
        <UInput icon="i-heroicons-search" placeholder="Search logs..." class="max-w-sm" />
        <USelectMenu :options="['All Actions', 'Login', 'Update', 'Delete']" placeholder="Filter by System Action" class="w-48" />
      </div>
      <!-- Note: We are not importing the full standard data table since this is strictly view-only, no actions allowed -->
      <UTable :columns="columns" :rows="auditLogs || []">
        <template #timestamp-data="{ row }">
          {{ new Date(row.timestamp).toLocaleString() }}
        </template>
        <template #action-data="{ row }">
          <UBadge size="xs" :color="row.action === 'DELETE' ? 'red' : 'gray'">{{ row.action }}</UBadge>
        </template>
      </UTable>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import PageHeader from '~/app/components/shared/PageHeader.vue'

const columns = [
  { key: 'timestamp', label: 'Time' },
  { key: 'ipAddress', label: 'IP Address' },
  { key: 'userId', label: 'User ID' },
  { key: 'action', label: 'Action' },
  { key: 'details', label: 'Details' }
]

// Assuming an audit logs API exists, else defaults to empty
const { data: auditLogs } = await useFetch('/api/admin/audits', { default: () => [] })
</script>
