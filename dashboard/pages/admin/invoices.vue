<template>
  <div>
    <PageHeader title="Manage Invoices" :breadcrumbs="[{label: 'Dashboard', to: '/dashboard'}, {label: 'Admin'}, {label: 'Invoices'}]" />
    <UCard>
      <StandardDataTable :columns="columns" :rows="invoices" @add="isModalOpen = true" @edit="editInvoice" @delete="deleteInvoice" />
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
import PageHeader from '~/app/components/shared/PageHeader.vue'
import StandardDataTable from '~/app/components/shared/StandardDataTable.vue'
import EntityFormModal from '~/app/components/shared/EntityFormModal.vue'

const isModalOpen = ref(false)
const columns = [{ key: 'id', label: 'ID' }, { key: 'amount', label: 'Amount' }, { key: 'status', label: 'Status' }, { key: 'actions' }]
const invoices = ref([{ id: 'INV-101', amount: '1500', status: 'PENDING' }, { id: 'INV-102', amount: '200', status: 'PAID' }])

const invoiceFields = [
  { name: 'amount', label: 'Amount', type: 'text' },
  { name: 'status', label: 'Status', type: 'select', options: ['PENDING', 'PAID', 'OVERDUE'] }
]

const saveInvoice = (data: any) => { invoices.value.push({ id: `INV-${Date.now().toString().slice(-3)}`, ...data }) }
const editInvoice = (row: any) => { alert('Edit: ' + row.id) }
const deleteInvoice = (row: any) => { invoices.value = invoices.value.filter(i => i.id !== row.id) }
</script>
