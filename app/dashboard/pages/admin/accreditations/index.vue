<script setup lang="ts">
import { ref, computed } from 'vue';
import dayjs from 'dayjs';

interface Accreditation {
  id: string;
  name: string;
  status: string;
  expiryDate: string;
}

const columns = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Accreditation Name' },
  { key: 'status', label: 'Status' },
  { key: 'expiryDate', label: 'Expiry Date', hidden: true },
  { key: 'formattedExpiryDate', label: 'Expiry Date' },
  { key: 'actions', label: 'Actions' },
];

const { data: accreditations, pending, error, refresh } = await useFetch('/api/admin/accreditations');

const formattedAccreditations = computed(() => {
  if (!accreditations.value) return [];
  return accreditations.value.map(acc => ({
    ...acc,
    formattedExpiryDate: dayjs(acc.expiryDate).format('YYYY-MM-DD'),
  }));
});

function viewDetails(accreditation: Accreditation) {
  console.log('Viewing details for:', accreditation);
}

function manageAccreditation(accreditation: Accreditation) {
  console.log('Managing accreditation:', accreditation);
}
</script>

<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Manage Accreditations</h1>
    <UTable :rows="formattedAccreditations" :columns="columns">
      <template #status-data="{ row }">
        <UBadge :color="row.status === 'ACTIVE' ? 'success' : 'warning'">{{ row.status }}</UBadge>
      </template>
      <template #actions-data="{ row }">
        <UButton variant="ghost" @click="viewDetails(row)">View Details</UButton>
        <UButton variant="ghost" color="error" @click="manageAccreditation(row)">Manage</UButton>
      </template>
    </UTable>
  </div>
</template>
