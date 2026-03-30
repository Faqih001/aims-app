<script setup lang="ts">
const authStore = useAuthStore();
const { data: applications, pending, error } = useFetch(`/api/assessors/${authStore.user?.id}/assignments`);

const columns = [
  { key: 'id', label: 'ID' },
  { key: 'applicant.name', label: 'Applicant' },
  { key: 'organization.name', label: 'Organization' },
  { key: 'scope', label: 'Scope' },
  { key: 'status', label: 'Status' },
  { key: 'actions', label: 'Actions' }
]

const items = (application: any) => [
  [{
    label: 'View',
    icon: 'i-heroicons-eye-20-solid',
    click: () => navigateTo(`/dashboard/assessor/applications/${application.id}`)
  }]
]
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold mb-4">Assigned Applications</h1>

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
