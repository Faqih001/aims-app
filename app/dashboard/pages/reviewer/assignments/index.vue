<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui/dist/runtime/types';

interface Application {
  id: number;
  applicant: {
    name: string;
  };
  organization: {
    name: string;
  };
  scope: string;
  status: string;
}
const authStore = useAuthStore();
const { data: applications, pending, error } = await useFetch<Application[]>(
  `/api/reviewers/${authStore.user?.id}/assignments`
)

const columns: TableColumn[] = [
  { key: 'id', label: 'ID' },
  { key: 'applicant.name', label: 'Applicant' },
  { key: 'organization.name', label: 'Organization' },
  { key: 'scope', label: 'Scope' },
  { key: 'status', label: 'Status' },
  { key: 'actions', label: 'Actions' }
]

const items = (application: Application) => [
  [{
    label: 'View',
    icon: 'i-heroicons-eye-20-solid',
    click: () => navigateTo(`/dashboard/reviewer/applications/${application.id}`)
  }]
]
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold mb-4">Assigned Applications for Review</h1>

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
