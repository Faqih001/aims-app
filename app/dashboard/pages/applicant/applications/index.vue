<script setup lang="ts">
import { useAuthStore } from '~/app/dashboard/stores/auth'
const authStore = useAuthStore()
const { data: applications, pending, error } = await useFetch(`/api/users/${authStore.user?.id}/applications`)

const columns = [
  { key: 'id', label: 'ID' },
  { key: 'organization.name', label: 'Organization' },
  { key: 'scope', label: 'Scope' },
  { key: 'status', label: 'Status' },
  { key: 'actions', label: 'Actions' }
]

const items = (application: any) => [
  [{
    label: 'View',
    icon: 'i-heroicons-eye-20-solid',
    click: () => navigateTo(`/dashboard/applicant/applications/${application.id}`)
  }]
]
</script>

<template>
  <div>
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-3xl font-bold">My Applications</h1>
      <UButton to="/dashboard/applicant/applications/create" icon="i-heroicons-plus-20-solid">New Application</UButton>
    </div>

    <div v-if="pending">Loading...</div>
    <div v-else-if="error">Error: {{ error.message }}</div>
    <UTable v-else :rows="applications" :columns="columns">
      <template #actions-data="{ row }">
        <UDropdown :items="items(row)">
          <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
        </UDropdown>
      </template>
    </UTable>
  </div>
</template>
