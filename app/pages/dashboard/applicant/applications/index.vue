<script setup lang="ts">

interface Application {
  id: number;
  organization: {
    name: string;
  };
  scope: string;
  status: string;
}

const authStore = useAuthStore()
const { data: applications, pending, error } = await useFetch<Application[]>(`/api/users/${authStore.user?.id}/applications`)

const columns = [
  { id: 'id', key: 'id', label: 'ID' },
  { id: 'organization.name', key: 'organization.name', label: 'Organization' },
  { id: 'scope', key: 'scope', label: 'Scope' },
  { id: 'status', key: 'status', label: 'Status' },
  { id: 'actions', key: 'actions', label: 'Actions' }
]

const items = (application: Application) => [
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

    <UTable :rows="applications || []" :columns="columns">
      <template #actions-data="{ row }">
        <UDropdownMenu :items="items(row)">
          <UButton color="primary" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
        </UDropdownMenu>
      </template>
    </UTable>
  </div>
</template>
