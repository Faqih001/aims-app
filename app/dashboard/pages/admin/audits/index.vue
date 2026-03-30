<script setup lang="ts">
import { ref } from 'vue';

interface Audit {
  id: number;
  timestamp: string;
  user: {
    name: string;
    role: string;
  };
  action: string;
  details: string;
}

const columns = [
  { key: 'timestamp', label: 'Timestamp' },
  { key: 'user', label: 'User' },
  { key: 'action', label: 'Action' },
  { key: 'details', label: 'Details' },
];

const audits = ref<Audit[]>([
  {
    id: 1,
    timestamp: '2023-10-27 10:00:00',
    user: { name: 'Admin User', role: 'Admin' },
    action: 'User Login',
    details: 'User admin@example.com logged in successfully.',
  },
  {
    id: 2,
    timestamp: '2023-10-27 10:05:00',
    user: { name: 'John Doe', role: 'Applicant' },
    action: 'Application Submitted',
    details: 'Application #12345 submitted.',
  },
  {
    id: 3,
    timestamp: '2023-10-27 10:15:00',
    user: { name: 'Jane Smith', role: 'Assessor' },
    action: 'Application Reviewed',
    details: 'Application #12345 reviewed.',
  },
]);
</script>

<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Audit Logs</h1>
    <UTable<Audit> :rows="audits" :columns="columns">
      <template #user-data="{ row }">
        <span>{{ row.user.name }} ({{ row.user.role }})</span>
      </template>
    </UTable>
  </div>
</template>
