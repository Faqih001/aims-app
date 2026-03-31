<template>
  <div>
    <PageHeader title="User Management" :breadcrumbs="[{label: 'Dashboard', to: '/dashboard'}, {label: 'Admin', to: '/dashboard/pages/admin'}, {label: 'Users'}]" />
    <UCard>
      <StandardDataTable :columns="columns" :rows="users || []" @add="openAddModal" @edit="editUser" @delete="deleteUser" />
    </UCard>
    <EntityFormModal 
      v-model="isModalOpen" 
      :title="modalTitle" 
      :fields="userFields"
      :initialData="activeUser"
      @save="saveUser"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import PageHeader from '~/app/components/shared/PageHeader.vue'
import StandardDataTable from '~/app/components/shared/StandardDataTable.vue'
import EntityFormModal from '~/app/components/shared/EntityFormModal.vue'

const isModalOpen = ref(false)
const modalTitle = ref('Add New User')
const activeUser = ref({})

// Define Table Columns
const columns = [
  { key: 'name', label: 'Name' }, 
  { key: 'email', label: 'Email' }, 
  { key: 'role', label: 'Role' }, 
  { key: 'actions' }
]

// Fetch from Generic CRUD mapped API (Assumption: we have /api/users or use dummy data until backend is fully seeded)
const { data: users, refresh } = await useFetch('/api/admin/users', { default: () => [] })

// Define Form schema
const userFields = [
  { name: 'name', label: 'Full Name', type: 'text' },
  { name: 'email', label: 'Email Address', type: 'text' },
  { name: 'role', label: 'System Role', type: 'select', options: ['APPLICANT', 'ASSESSOR', 'TECHNICAL_REVIEWER', 'SYSTEM_ADMIN'] }
]

const openAddModal = () => {
  modalTitle.value = 'Add New User'
  activeUser.value = { role: 'APPLICANT' }
  isModalOpen.value = true
}

const editUser = (row: any) => { 
  modalTitle.value = 'Edit User'
  activeUser.value = { ...row }
  isModalOpen.value = true
}

const saveUser = async (data: any) => { 
  if (data.id) {
    await $fetch(`/api/users/${data.id}`, { method: 'PUT', body: data })
  } else {
    await $fetch('/api/users', { method: 'POST', body: data })
  }
  isModalOpen.value = false
  await refresh()
}

const deleteUser = async (row: any) => { 
  if(confirm(`Are you sure you want to delete ${row.name}?`)) {
    await $fetch(`/api/users/${row.id}`, { method: 'DELETE' })
    await refresh()
  }
}
</script>
