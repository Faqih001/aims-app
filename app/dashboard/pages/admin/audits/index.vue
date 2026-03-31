<script setup lang="ts">
import { ref, computed } from 'vue';
import dayjs from 'dayjs';

interface Audit {
  id: string;
  timestamp: string;
  user: {
    name: string;
    role: string;
  } | null;
  action: string;
  details: string | null;
}

const columns = [
  { key: 'formattedTimestamp', label: 'Timestamp' },
  { key: 'user.name', label: 'User' },
  { key: 'user.role', label: 'Role' },
  { key: 'action', label: 'Action' },
  { key: 'details', label: 'Details' },
];

const { data: audits, pending, error, refresh } = await useFetch<any>('/api/admin/audits');

const formattedAudits = computed(() => {
  if (!audits.value) return [];
  return audits.value.map(audit => ({
    ...audit,
    formattedTimestamp: dayjs(audit.timestamp).format('YYYY-MM-DD HH:mm:ss'),
  }));
});
</script>

<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Audit Logs</h1>
    <UTable :rows="formattedAudits" :columns="columns as any" />
  </div>
</template>
