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

      <div class="mt-8" v-if="documents && documents.length > 0">
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

// Fetch from API
const { data: documents, refresh } = await useFetch('/api/documents', { default: () => [] })

const columns = [
  { key: 'name', label: 'File Name' },
  { key: 'type', label: 'Document Type' },
  { key: 'createdAt', label: 'Upload Date' },
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

const processFiles = async (files: FileList) => {
  for (const file of Array.from(files)) {
     // In a real app we would use FormData to upload the file to cloud storage here
     // For this test we will just seed the metadata directly to the database
     await $fetch('/api/documents', {
       method: 'POST',
       body: {
         name: file.name,
         url: `/uploads/tmp/${file.name}`,
         type: 'OTHER',
         applicationId: '00000000-0000-0000-0000-000000000000' // dummy ref
       }
     })
  }
  await refresh()
}

const removeDoc = async (row: any) => {
  await $fetch(`/api/documents/${row.id}`, { method: 'DELETE' })
  await refresh()
}
</script>
