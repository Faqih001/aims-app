<template>
  <div>
    <PageHeader title="Billing & Invoicing" :breadcrumbs="[{label: 'Dashboard', to: '/dashboard'}, {label: 'Billing'}]" />
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <UCard>
        <template #header><h3 class="font-bold text-lg">Pending Invoices</h3></template>
        <div v-if="pendingInvoices.length">
          <div v-for="inv in pendingInvoices" :key="inv.id" class="flex justify-between items-center p-4 border rounded mb-2 bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200">
            <div>
              <p class="font-semibold text-yellow-900 dark:text-yellow-100">{{ inv.description || `Invoice #${inv.id}` }}</p>
              <p class="text-sm text-yellow-700 dark:text-yellow-300">Amount: ${{ inv.amount }}</p>
            </div>
            <UButton color="yellow" label="Pay Now" @click="pay(inv)" />
          </div>
        </div>
        <p v-else class="text-gray-500">No pending invoices.</p>
      </UCard>

      <UCard>
        <template #header><h3 class="font-bold text-lg">Payment History</h3></template>
        <UTable :columns="historyColumns" :rows="paidInvoices">
          <template #actions-data="{ row }">
            <UButton color="gray" variant="ghost" icon="i-heroicons-document-arrow-down" label="PDF" @click="generatePDF(row)" />
          </template>
        </UTable>
      </UCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import PageHeader from '~/app/components/shared/PageHeader.vue'

// API Fetch logic
const { data: dbInvoices, refresh } = await useFetch('/api/applicant/invoices', { default: () => [] })

// Compute split statuses from the endpoint
const pendingInvoices = computed(() => dbInvoices.value?.filter((i: any) => i.status === 'PENDING') || [])
const paidInvoices = computed(() => dbInvoices.value?.filter((i: any) => i.status === 'PAID') || [])

const historyColumns = [
  { key: 'id', label: 'Invoice ID' },
  { key: 'amount', label: 'Cost' },
  { key: 'date', label: 'Date Issued' },
  { key: 'actions' }
]

const pay = async (inv: any) => {
  await $fetch(`/api/invoices/${inv.id}`, { method: 'PUT', body: { status: 'PAID' } })
  await refresh()
  alert(`Payment successful simulated! Record updated in database.`)
}

const generatePDF = (row: any) => {
  alert(`Generating PDF receipt for ${row.id}...`)
}
</script>
