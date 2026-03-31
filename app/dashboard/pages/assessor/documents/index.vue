<script setup lang="ts">
import { ref } from 'vue'

const columns = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Document Name' },
  { key: 'type', label: 'Type' },
  { key: 'uploadDate', label: 'Uploaded' },
  { key: 'actions', label: 'Actions' }
]

const documents = ref([
  { id: 'DOC-001', name: 'ISO 9001 Guidelines.pdf', type: 'PDF', uploadDate: '2025-10-12' },
  { id: 'DOC-002', name: 'Assessment_Criteria_v2.docx', type: 'Word', uploadDate: '2025-11-05' }
])

const isUploading = ref(false)

function handleUpload() {
  isUploading.value = true
  setTimeout(() => {
    documents.value.push({ id: `DOC-00${documents.value.length + 1}`, name: 'New_Assessment_Doc.pdf', type: 'PDF', uploadDate: new Date().toISOString().split('T')[0] })
    isUploading.value = false
  }, 1000)
}
</script>
<template>
  <div class="space-y-6">
    <DashboardBreadcrumb :breadcrumbs="[{label: 'Assessor', to: '/dashboard/assessor'}, {label: 'Documents'}]" />
    <div class="flex justify-between items-center">
      <h1 class="text-3xl font-bold">Assessor Documents</h1>
      <UButton icon="i-heroicons-document-arrow-up" color="primary" :loading="isUploading" @click="handleUpload">Upload Resource</UButton>
    </div>
    <UCard>
      <UTable :columns="columns" :rows="documents">
        <template #actions-data="{ row }">
          <UButton size="xs" color="neutral" variant="ghost" icon="i-heroicons-arrow-down-tray" />
        </template>
      </UTable>
    </UCard>
  </div>
</template>
