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
import { ref } from 'vue';

const columns = [
  { key: 'auditId', label: 'Audit ID' },
  { key: 'date', label: 'Date' },
  { key: 'type', label: 'Type' },
  { key: 'status', label: 'Status' },
  { key: 'actions', label: 'Actions' },
];

const audits = ref([
  { auditId: 'AUD-001', date: '2023-09-15', type: 'Initial Assessment', status: 'Completed' },
  { auditId: 'AUD-002', date: '2023-11-05', type: 'Follow-up', status: 'Scheduled' },
]);

function viewDetails(audit: any) {
  console.log('Viewing audit details:', audit);
}
</script>
