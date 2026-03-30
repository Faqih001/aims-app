<script setup lang="ts">
import { ref } from 'vue';

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
  { key: 'expiryDate', label: 'Expiry Date' },
  { key: 'actions', label: 'Actions' },
];

const accreditations = ref<Accreditation[]>([
  { id: 'ACC001', name: 'ISO 9001:2015', status: 'Active', expiryDate: '2024-12-31' },
  { id: 'ACC002', name: 'ISO 14001:2015', status: 'Active', expiryDate: '2025-06-30' },
  { id: 'ACC003', name: 'ISO 27001:2013', status: 'Pending Renewal', expiryDate: '2023-11-15' },
]);

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
    <UTable :rows="accreditations" :columns="columns">
      <template #status-data="{ row }">
        <UBadge :color="(row as Accreditation).status === 'Active' ? 'success' : 'warning'">{{ (row as Accreditation).status }}</UBadge>
      </template>
      <template #actions-data="{ row }">
        <UButton variant="ghost" @click="viewDetails(row as Accreditation)">View Details</UButton>
        <UButton variant="ghost" color="error" @click="manageAccreditation(row as Accreditation)">Manage</UButton>
      </template>
    </UTable>
  </div>
</template>
