<template>
  <div>
    <PageHeader title="All Applications" :breadcrumbs="[{label: 'Dashboard', to: '/dashboard'}, {label: 'Admin', to: '/dashboard/admin'}, {label: 'Applications'}]" />
    <UCard>
      <StandardDataTable :columns="columns" :rows="applications || []" @add="openAddModal" @edit="editApp" @delete="deleteApp" />
    </UCard>
    <EntityFormModal 
      v-model="isModalOpen" 
      :title="modalTitle" 
      :fields="appFields"
      :initialData="activeApp"
      @save="saveApp"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import StandardDataTable from '~/components/shared/StandardDataTable.vue'
import EntityFormModal from '~/components/shared/EntityFormModal.vue'

const isModalOpen = ref(false)
const modalTitle = ref('Add Application')
const activeApp = ref({})

const columns = [
  { key: 'id', label: 'App ID' }, 
  { key: 'scope', label: 'Scope' }, 
  { key: 'status', label: 'Status' }, 
  { key: 'assessmentType', label: 'Type' },
  { key: 'actions' }
]

const { data: applications, refresh } = await useFetch('/api/admin/applications', { default: () => [] })

const appFields = [
  { name: 'scope', label: 'Assessment Scope', type: 'text' },
  { name: 'status', label: 'Application Status', type: 'select', options: ['PENDING', 'IN_REVIEW', 'APPROVED', 'REJECTED'] },
  { name: 'assessmentType', label: 'Assessment Type', type: 'select', options: ['Initial', 'Surveillance', 'Renew'] }
]

const openAddModal = () => {
  modalTitle.value = 'Create Application Record'
  activeApp.value = { status: 'PENDING', assessmentType: 'Initial' }
  isModalOpen.value = true
}

const editApp = (row: any) => { 
  modalTitle.value = 'Edit Application'
  activeApp.value = { ...row }
  isModalOpen.value = true
}

const saveApp = async (data: any) => { 
  if (data.id) {
    await $fetch(`/api/admin/applications/${data.id}`, { method: 'PUT', body: data })
  } else {
    await $fetch('/api/admin/applications', { method: 'POST', body: data })
  }
  isModalOpen.value = false
  await refresh()
}

const deleteApp = async (row: any) => { 
  if(confirm(`Are you sure you want to delete this application?`)) {
    await $fetch(`/api/admin/applications/${row.id}`, { method: 'DELETE' })
    await refresh()
  }
}
</script>
