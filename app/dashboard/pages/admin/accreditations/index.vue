<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Manage Accreditations</h1>
    <UTable :rows="accreditations" :columns="columns">
      <template #status-data="{ row }">
        <UBadge :color="row.status === 'Active' ? 'green' : 'orange'">{{ row.status }}</UBadge>
      </template>
      <template #actions-data="{ row }">
        <UButton variant="ghost" @click="viewDetails(row)">View Details</UButton>
        <UButton variant="ghost" color="red" @click="manageAccreditation(row)">Manage</UButton>
      </template>
    </UTable>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const columns = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Accreditation Name' },
  { key: 'status', label: 'Status' },
  { key: 'expiryDate', label: 'Expiry Date' },
  { key: 'actions', label: 'Actions' },
];

const accreditations = ref([
  { id: 'ACC001', name: 'ISO 9001:2015', status: 'Active', expiryDate: '2024-12-31' },
  { id: 'ACC002', name: 'ISO 14001:2015', status: 'Active', expiryDate: '2025-06-30' },
  { id: 'ACC003', name: 'ISO 27001:2013', status: 'Pending Renewal', expiryDate: '2023-11-15' },
]);

function viewDetails(accreditation: any) {
  console.log('Viewing details for:', accreditation);
}

function manageAccreditation(accreditation: any) {
  console.log('Managing accreditation:', accreditation);
}
</script>
