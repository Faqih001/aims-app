<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">My Audits</h1>
    <UTable :rows="audits" :columns="columns" :pending="pending">
      <template #actions-data="{ row }">
        <UButton variant="ghost" @click="viewDetails(row)">View Details</UButton>
      </template>
    </UTable>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const authStore = useAuthStore();
const { data: audits, pending, error } = useFetch<any>(`/api/assessors/${authStore.user?.id}/audits`);

const columns: TableColumn[] = [
  { key: 'id', label: 'Audit ID' },
  { key: 'application.organization.name', label: 'Organization' },
  { key: 'timestamp', label: 'Date' },
  { key: 'action', label: 'Action' },
  { key: 'details', label: 'Details' },
  { key: 'actions', label: 'Actions' },
];

function viewDetails(audit: any) {
  console.log('Viewing audit details:', audit);
}
</script>
