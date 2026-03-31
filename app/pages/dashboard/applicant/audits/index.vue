<script setup lang="ts">
import { ref } from 'vue';

interface Audit {
  auditId: string;
  date: string;
  auditor?: string;
  type?: string;
  status: string;
}

const columns = [
  { key: 'auditId', label: 'Audit ID' },
  { key: 'date', label: 'Date' },
  { key: 'type', label: 'Type' },
  { key: 'status', label: 'Status' },
  { key: 'actions', label: 'Actions' },
];

const audits = ref<Audit[]>([
  { auditId: 'AUD-001', date: '2023-09-15', type: 'Initial Assessment', status: 'Completed' },
  { auditId: 'AUD-002', date: '2023-11-05', type: 'Follow-up', status: 'Scheduled' },
]);

function viewDetails(audit: Audit) {
  console.log('Viewing details for:', audit);
}
</script>

<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">My Audits</h1>
    <UTable :rows="audits" :columns="columns">
      <template #status-data="{ row }">
        <UBadge :color="row.status === 'Completed' ? 'success' : 'warning'">{{ row.status }}</UBadge>
      </template>
      <template #actions-data="{ row }">
        <UButton variant="ghost" @click="viewDetails(row)">View Details</UButton>
      </template>
    </UTable>
  </div>
</template>
