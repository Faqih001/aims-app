<script setup lang="ts">
import { ref, reactive } from 'vue';

interface Document {
  id: number;
  name: string;
  type: string;
  size: string;
  uploadedAt: string;
}

const authStore = useAuthStore();
const { data: documents, pending, error, refresh } = useFetch(`/api/users/${authStore.user?.id}/documents`);

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'url', label: 'Type' },
  { key: 'application.organization.name', label: 'Organization' },
  { key: 'createdAt', label: 'Uploaded At' },
  { key: 'actions', label: 'Actions' }
];

const isUploadModalOpen = ref(false);
const newDocument = reactive({
  name: '',
  file: null as File | null,
});

function onFileChange(event: Event) {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    newDocument.file = target.files[0];
  } else {
    newDocument.file = null;
  }
}

async function uploadDocument() {
  if (!newDocument.file) {
    alert('Please select a file to upload.');
    return;
  }

  // Here you would typically upload the file to a server
  // For this example, we'll just add it to our local array
  // const newId = documents.value.length + 1;
  // documents.value.push({
  //   id: newId,
  //   name: newDocument.name || newDocument.file.name,
  //   type: newDocument.file.type,
  //   size: `${(newDocument.file.size / 1024 / 1024).toFixed(2)} MB`,
  //   uploadedAt: new Date().toISOString().split('T')[0] || '',
  // });

  isUploadModalOpen.value = false;
  newDocument.name = '';
  newDocument.file = null;
}

async function deleteDocument(doc: any) {
  await $fetch(`/api/documents/${doc.id}`, {
    method: 'DELETE',
  });
  refresh();
}
</script>

<template>
  <div class="p-4">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-bold">My Documents</h1>
      <UButton @click="isUploadModalOpen = true" label="Upload Document" />
    </div>

    <UTable :rows="documents" :columns="columns" :loading="pending">
      <template #actions-data="{ row }">
        <UButton variant="ghost" icon="i-heroicons-trash" @click="deleteDocument(row)" />
        <UButton variant="ghost" icon="i-heroicons-eye" :to="row.url" target="_blank" />
      </template>
    </UTable>

    <UModal v-model="isUploadModalOpen">
      <UCard>
        <template #header>
          <h2 class="text-xl font-semibold">Upload New Document</h2>
        </template>
        
        <UForm :state="newDocument" @submit="uploadDocument">
          <UFormGroup label="Document Name" name="name">
            <UInput v-model="newDocument.name" />
          </UFormGroup>
          <UFormGroup label="File" name="file">
            <UInput type="file" @change="onFileChange" />
          </UFormGroup>
          
          <UButton type="submit" label="Upload" class="mt-4" />
        </UForm>
      </UCard>
    </UModal>
  </div>
</template>
