<template>
  <div>
    <PageHeader title="Document Upload Manager" :breadcrumbs="[{label: 'Dashboard', to: '/dashboard'}, {label: 'Documents'}]" />
    <UCard>
      <div 
        class="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-12 text-center hover:bg-gray-50 dark:hover:bg-gray-800 transition cursor-pointer"
        @dragover.prevent="dragover = true"
        @dragleave.prevent="dragover = false"
        @drop.prevent="handleDrop"
        @click="fileInput.click()"
        :class="{'bg-gray-50 dark:bg-gray-800 border-primary-500': dragover}"
      >
        <UIcon name="i-heroicons-cloud-arrow-up" class="w-12 h-12 mx-auto text-gray-400 mb-4" />
        <p class="text-sm text-gray-600 dark:text-gray-400">Drag and drop your files here, or click to upload</p>
        <input type="file" multiple class="hidden" ref="fileInput" @change="handleFileSelect" />
      </div>

      <div class="mt-8" v-if="documents.length > 0">
        <h3 class="text-lg font-semibold mb-4">Uploaded Documents</h3>
        <UTable :columns="columns" :rows="documents">
          <template #actions-data="{ row }">
            <UButton color="red" variant="ghost" icon="i-heroicons-trash" @click="removeDoc(row)" />
          </template>
        </UTable>
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import PageHeader from '~/app/components/shared/PageHeader.vue'

const dragover = ref(false)
const fileInput = ref()
const documents = ref([
  { id: 1, name: 'Company_Registration.pdf', type: 'CERTIFICATE', date: '2026-03-31' }
])

const columns = [
  { key: 'name', label: 'File Name' },
  { key: 'type', label: 'Document Type' },
  { key: 'date', label: 'Upload Date' },
  { key: 'actions' }
]

const handleDrop = (e: DragEvent) => {
  dragover.value = false
  if (e.dataTransfer?.files) processFiles(e.dataTransfer.files)
}

const handleFileSelect = (e: Event) => {
  const target = e.target as HTMLInputElement
  if (target.files) processFiles(target.files)
}

const processFiles = (files: FileList) => {
  Array.from(files).forEach(file => {
    documents.value.push({
      id: Math.random(),
      name: file.name,
      type: 'OTHER',
      date: new Date().toISOString().split('T')[0]
    })
  })
}

const removeDoc = (row: any) => {
  documents.value = documents.value.filter(d => d.id !== row.id)
}
</script>
