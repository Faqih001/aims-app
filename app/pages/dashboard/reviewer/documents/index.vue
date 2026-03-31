<script setup lang="ts">
import { ref } from 'vue'

const columns = [
  { key: 'title', label: 'Title' },
  { key: 'category', label: 'Category' },
  { key: 'size', label: 'Size' },
  { key: 'actions', label: '' }
]
const docs = ref([
  { title: 'Calibration Review Template', category: 'Templates', size: '1.2 MB' },
  { title: 'Quality Assurance Standards 2026', category: 'Guidelines', size: '3.4 MB' }
])
</script>
<template>
  <div class="space-y-6">
    <DashboardBreadcrumb :breadcrumbs="[{label: 'Reviewer', to: '/dashboard/reviewer'}, {label: 'Documents'}]" />
    <h1 class="text-3xl font-bold">Reference Library</h1>
    <UCard>
      <UTable :columns="columns" :rows="docs">
        <template #actions-data="{ row }">
          <UButton icon="i-heroicons-eye" color="neutral" variant="ghost" size="xs" />
          <UButton icon="i-heroicons-arrow-down-tray" color="neutral" variant="ghost" size="xs" />
        </template>
      </UTable>
    </UCard>
  </div>
</template>
