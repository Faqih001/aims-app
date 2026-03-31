<template>
  <div>
    <PageHeader title="Billing & Invoicing" :breadcrumbs="[{label: 'Dashboard', to: '/dashboard'}, {label: 'Billing'}]" />
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <UCard>
        <template #header><h3 class="font-bold text-lg">Pending Invoices</h3></template>
        <div v-if="invoices.pending.length">
          <div v-for="inv in invoices.pending" :key="inv.id" class="flex justify-between items-center p-4 border rounded mb-2 bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200">
            <div>
              <p class="font-semibold text-yellow-900 dark:text-yellow-100">{{ inv.description }}</p>
              <p class="text-sm text-yellow-700 dark:text-yellow-300">Amount: ${{ inv.amount }}</p>
            </div>
            <UButton color="yellow" label="Pay Now" @click="pay(inv.id)" />
          </div>
        </div>
        <p v-else class="text-gray-500">No pending invoices.</p>
      </UCard>

      <UCard>
        <template #header><h3 class="font-bold text-lg">Payment History</h3></template>
        <UTable :columns="historyColumns" :rows="invoices.paid">
          <template #actions-data="{ row }">
            <UButton color="gray" variant="ghost" icon="i-heroicons-document-arrow-down" label="PDF" @click="generatePDF(row)" />
          </template>
        </UTable>
      </UCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import PageHeader from '~/components/shared/PageHeader.vue'

const invoices = ref({
  pending: [{ id: 'INV-101', description: 'Initial Assessment Fee', amount: '1500.00' }],
  paid: [{ id: 'INV-099', description: 'Application Registration', amount: '250.00', date: '2026-03-01' }]
})

const historyColumns = [
  { key: 'id', label: 'Invoice ID' },
  { key: 'description', label: 'Desc' },
  { key: 'amount', label: 'Cost' },
  { key: 'actions' }
]

const pay = (id: string) => {
  const invIndex = invoices.value.pending.findIndex(i => i.id === id)
  if (invIndex >= 0) {
    const inv = invoices.value.pending.splice(invIndex, 1)[0]
    invoices.value.paid.push({ ...inv, date: new Date().toISOString().split('T')[0] })
    alert(`Payment successful for ${id}! API call triggered updating is_paid=true.`)
  }
}

const generatePDF = (row: any) => {
  alert(`Generating PDF receipt for ${row.id}...`)
}
</script>
