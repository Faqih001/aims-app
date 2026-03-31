<script setup lang="ts">
interface Reviewer {
  id: string;
  name: string;
  email: string;
  completedReviews?: number;
}

const { data: reviewers, pending, error, refresh } = await useFetch<Reviewer[]>('/api/admin/reviewers');

const columns = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'completedReviews', label: 'Completed Reviews' },
  { key: 'actions', label: 'Actions' },
];

const items = (reviewer: Reviewer) => [
  [{
    label: 'Edit',
    icon: 'i-heroicons-pencil-square-20-solid',
    click: () => navigateTo(`/dashboard/admin/reviewers/${reviewer.id}/edit`)
  }],
  [{
    label: 'Delete',
    icon: 'i-heroicons-trash-20-solid',
    click: async () => {
      if (confirm('Are you sure you want to delete this reviewer?')) {
        await $fetch(`/api/admin/reviewers/${reviewer.id}`, { method: 'DELETE' })
        refresh()
      }
    }
  }]
]
</script>

<template>
  <div class="p-4">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-bold">Manage Reviewers</h1>
      <UButton to="/dashboard/admin/reviewers/create" icon="i-heroicons-plus-20-solid">Add Reviewer</UButton>
    </div>
    <UTable :rows="reviewers" :columns="columns as any">
      <template #actions-data="{ row }">
        <UDropdown :items="items(row as Reviewer)">
          <UButton color="primary" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
        </UDropdown>
      </template>
    </UTable>
  </div>
</template>
