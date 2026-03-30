<script setup lang="ts">
import { computed } from 'vue';
import dayjs from 'dayjs';

interface Accreditation {
  id: string;
  name: string;
  status: string;
  expiryDate: string;
}

const { data: accreditations, pending, error, refresh } = await useFetch<Accreditation[]>('/api/admin/accreditations');

const columns = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Accreditation Name' },
  { key: 'status', label: 'Status' },
  { key: 'formattedExpiryDate', label: 'Expiry Date' },
  { key: 'actions', label: 'Actions' },
];

const formattedAccreditations = computed(() => {
  if (!accreditations.value) return [];
  return accreditations.value.map(acc => ({
    ...acc,
    formattedExpiryDate: dayjs(acc.expiryDate).format('YYYY-MM-DD'),
  }));
});

const items = (accreditation: Accreditation) => [
  [{
    label: 'Edit',
    icon: 'i-heroicons-pencil-square-20-solid',
    click: () => navigateTo(`/dashboard/admin/accreditations/${accreditation.id}/edit`)
  }],
  [{
    label: 'Delete',
    icon: 'i-heroicons-trash-20-solid',
    click: async () => {
      if (confirm('Are you sure you want to delete this accreditation?')) {
        await $fetch(`/api/admin/accreditations/${accreditation.id}`, { method: 'DELETE' })
        refresh()
      }
    }
  }]
]
</script>

<template>
  <div class="p-4">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-bold">Manage Accreditations</h1>
      <UButton to="/dashboard/admin/accreditations/create" icon="i-heroicons-plus-20-solid">Add Accreditation</UButton>
    </div>
    <UTable :rows="formattedAccreditations" :columns="columns">
      <template #status-data="{ row }">
        <UBadge :color="row.status === 'ACTIVE' ? 'success' : 'warning'">{{ row.status }}</UBadge>
      </template>
      <template #actions-data="{ row }">
        <UDropdown :items="items(row as Accreditation)">
          <UButton color="primary" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
        </UDropdown>
      </template>
    </UTable>
  </div>
</template>
