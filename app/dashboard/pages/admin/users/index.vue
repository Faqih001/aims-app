<script setup lang="ts">
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

const { data: users, pending, error, refresh } = await useFetch<User[]>('/api/users')

const columns = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'role', label: 'Role' },
  { key: 'actions', label: 'Actions' }
]

const items = (user: User) => [
  [{
    label: 'Edit',
    icon: 'i-heroicons-pencil-square-20-solid',
    click: () => navigateTo(`/dashboard/admin/users/${user.id}/edit`)
  }],
  [{
    label: 'Delete',
    icon: 'i-heroicons-trash-20-solid',
    click: async () => {
      await $fetch(`/api/users/${user.id}`, { method: 'DELETE' })
      refresh()
    }
  }]
]
</script>

<template>
  <div>
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-3xl font-bold">Users</h1>
      <UButton to="/dashboard/admin/users/create" icon="i-heroicons-plus-20-solid">Add User</UButton>
    </div>

    <div v-if="pending">Loading...</div>
    <div v-else-if="error">Error: {{ error.message }}</div>
    <UTable v-else :rows="users" :columns="columns">
      <template #actions-data="{ row }">
        <UDropdown :items="items(row as User)">
          <UButton color="primary" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
        </UDropdown>
      </template>
    </UTable>
  </div>
</template>
