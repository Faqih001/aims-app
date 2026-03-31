<template>
  <div>
    <PageHeader title="Manage Invoices" :breadcrumbs="[{label: 'Dashboard', to: '/dashboard'}, {label: 'Admin'}, {label: 'Invoices'}]" />
    <UCard>
      <StandardDataTable :columns="columns" :rows="invoices || []" @add="isModalOpen = true" @edit="editInvoice" @delete="deleteInvoice" />
    </UCard>
    <EntityFormModal 
      v-model="isModalOpen" 
      title="Create Invoice" 
      :fields="invoiceFields"
      @save="saveInvoice"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import PageHeader from '~/components/shared/PageHeader.vue'
import StandardDataTable from '~/app/components/shared/StandardDataTable.vue'
import EntityFormModal from '~/app/components/shared/EntityFormModal.vue'

const isModalOpen = ref(false)
const columns = [{ key: 'id', label: 'ID' }, { key: 'amount', label: 'Amount' }, { key: 'status', label: 'Status' }, { key: 'actions' }]

// Real API Fetch
const { data: invoices, refresh } = await useFetch('/api/admin/invoices', { default: () => [] })

const invoiceFields = [
  { name: 'amount', label: 'Amount', type: 'text' },
  { name: 'status', label: 'Status', type: 'select', options: ['PENDING', 'PAID', 'OVERDUE'] },
  { name: 'userId', label: 'Assign To User ID', type: 'text' }
]

const saveInvoice = async (data: any) => { 
  await $fetch('/api/admin/invoices', { method: 'POST', body: { ...data, date: new Date().toISOString() } })
  isModalOpen.value = false
  await refresh()
}

const editInvoice = (row: any) => { alert('Edit modal would open for: ' + row.id) }
const deleteInvoice = async (row: any) => { 
  await $fetch(`/api/admin/invoices/${row.id}`, { method: 'DELETE' })
  await refresh()
}
</script>
