<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">My Audits</h1>
    <UTable :rows="audits" :columns="columns">
      <template #status-data="{ row }">
        <UBadge :color="row.status === 'Completed' ? 'green' : 'orange'">{{ row.status }}</UBadge>
      </template>
      <template #actions-data="{ row }">
        <UButton variant="ghost" @click="viewDetails(row)">View Details</UButton>
      </template>
    </UTable>
  </div>
</template>

<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui/dist/runtime/types';
import { ref } from 'vue';

const columns: TableColumn[] = [
  { key: 'auditId', label: 'Audit ID' },
  { key: 'applicationId', label: 'Application ID' },
  { key: 'date', label: 'Date' },
  { key: 'status', label: 'Status' },
  { key: 'actions', label: 'Actions' },
];

const audits = ref([
  { auditId: 'AUD-003', applicationId: 'APP-001', date: '2023-10-20', status: 'Completed' },
  { auditId: 'AUD-004', applicationId: 'APP-002', date: '2023-11-10', status: 'Scheduled' },
]);

function viewDetails(audit: any) {
  console.log('Viewing audit details:', audit);
}
</script>
