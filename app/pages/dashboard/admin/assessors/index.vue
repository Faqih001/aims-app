<script setup lang="ts">
interface Assessor {
  id: string;
  name: string;
  email: string;
}

const { data: assessors, pending, error, refresh } = await useFetch<Assessor[]>('/api/admin/assessors');

const columns = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'actions', label: 'Actions' },
];

const items = (assessor: Assessor) => [
  [{
    label: 'Edit',
    icon: 'i-heroicons-pencil-square-20-solid',
    click: () => navigateTo(`/dashboard/admin/assessors/${assessor.id}/edit`)
  }],
  [{
    label: 'Delete',
    icon: 'i-heroicons-trash-20-solid',
    click: async () => {
      if (confirm('Are you sure you want to delete this assessor?')) {
        await $fetch<any>(`/api/admin/assessors/${assessor.id}`, { method: 'DELETE' })
        refresh()
      }
    }
  }]
]
</script>

<template>
  <div class="p-4">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-bold">Manage Assessors</h1>
      <UButton to="/dashboard/admin/assessors/create" icon="i-heroicons-plus-20-solid">Add Assessor</UButton>
    </div>
    <UTable :rows="assessors" :columns="columns as any">
      <template #actions-data="{ row }">
        <UDropdown :items="items(row as Assessor)">
          <UButton color="primary" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
        </UDropdown>
      </template>
    </UTable>
  </div>
</template>
