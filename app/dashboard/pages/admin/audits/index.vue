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

const { data: audits, pending, error, refresh } = await useFetch('/api/admin/audits');
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
