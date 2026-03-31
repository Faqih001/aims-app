<template>
  <div>
    <PageHeader title="Payment Processing" :breadcrumbs="[{label: 'Dashboard', to: '/dashboard'}, {label: 'Admin', to: '/dashboard/pages/admin'}, {label: 'Payments'}]" />
    <UCard>
      <StandardDataTable :columns="columns" :rows="payments || []" @add="openAddModal" @edit="editPayment" @delete="deletePayment" />
    </UCard>
    <EntityFormModal 
      v-model="isModalOpen" 
      :title="modalTitle" 
      :fields="paymentFields"
      :initialData="activePayment"
      @save="savePayment"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import PageHeader from '~/app/components/shared/PageHeader.vue'
import StandardDataTable from '~/app/components/shared/StandardDataTable.vue'
import EntityFormModal from '~/app/components/shared/EntityFormModal.vue'

const isModalOpen = ref(false)
const modalTitle = ref('Record Payment')
const activePayment = ref({})

const columns = [
  { key: 'transactionId', label: 'Tx ID' }, 
  { key: 'amount', label: 'Amount' }, 
  { key: 'status', label: 'Status' }, 
  { key: 'paymentMethod', label: 'Method' },
  { key: 'actions' }
]

const { data: payments, refresh } = await useFetch('/api/admin/payments', { default: () => [] })

const paymentFields = [
  { name: 'transactionId', label: 'Transaction ID', type: 'text' },
  { name: 'amount', label: 'Amount', type: 'text' },
  { name: 'status', label: 'Status', type: 'select', options: ['COMPLETED', 'PENDING', 'FAILED'] },
  { name: 'paymentMethod', label: 'Payment Method', type: 'select', options: ['Credit Card', 'Bank Transfer', 'Stripe'] }
]

const openAddModal = () => {
  modalTitle.value = 'Log Manual Payment'
  activePayment.value = { status: 'COMPLETED', paymentMethod: 'Bank Transfer' }
  isModalOpen.value = true
}

const editPayment = (row: any) => { 
  modalTitle.value = 'Edit Payment Record'
  activePayment.value = { ...row }
  isModalOpen.value = true
}

const savePayment = async (data: any) => { 
  if (data.id) {
    await $fetch(`/api/payments/${data.id}`, { method: 'PUT', body: data })
  } else {
    await $fetch('/api/payments', { method: 'POST', body: data })
  }
  isModalOpen.value = false
  await refresh()
}

const deletePayment = async (row: any) => { 
  if(confirm(`Delete transaction ${row.transactionId}?`)) {
    await $fetch(`/api/payments/${row.id}`, { method: 'DELETE' })
    await refresh()
  }
}
</script>
