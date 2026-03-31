<script setup lang="ts">
import { ref, computed } from 'vue';
import dayjs from 'dayjs';

interface Invoice {
  id: string;
  date: string;
  amount: string;
  status: string;
  user: {
    name: string;
  } | null;
}

const invoiceColumns = [
  { key: 'formattedDate', label: 'Date' },
  { key: 'user.name', label: 'User' },
  { key: 'amount', label: 'Amount' },
  { key: 'status', label: 'Status' },
  { key: 'actions', label: 'Actions' },
];

const { data: invoices, pending, error, refresh } = await useFetch<any>('/api/admin/billing');

const formattedInvoices = computed(() => {
  if (!invoices.value) return [];
  return invoices.value.map(invoice => ({
    ...invoice,
    formattedDate: dayjs(invoice.date).format('YYYY-MM-DD'),
  }));
});

function downloadInvoice(invoice: Invoice) {
  console.log('Downloading invoice:', invoice);
}
</script>

<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Billing</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <UCard>
        <template #header>
          <h2 class="text-xl font-semibold">Current Plan</h2>
        </template>
        <div class="space-y-2">
          <p class="text-3xl font-bold">Enterprise</p>
          <p class="text-gray-500">$999 / month</p>
        </div>
        <template #footer>
          <UButton>Upgrade Plan</UButton>
        </template>
      </UCard>

      <UCard>
        <template #header>
          <h2 class="text-xl font-semibold">Payment Method</h2>
        </template>
        <div class="flex items-center space-x-4">
          <img src="https://www.svgrepo.com/show/303202/visa-logo.svg" alt="Visa" class="h-8" />
          <div>
            <p class="font-semibold">Visa ending in 1234</p>
            <p class="text-sm text-gray-500">Expires 12/2025</p>
          </div>
        </div>
        <template #footer>
          <UButton variant="outline">Update Payment Method</UButton>
        </template>
      </UCard>

      <UCard>
        <template #header>
          <h2 class="text-xl font-semibold">Next Invoice</h2>
        </template>
        <div class="space-y-2">
          <p class="text-lg">November 1, 2023</p>
          <p class="text-gray-500">for $999.00</p>
        </div>
      </UCard>
    </div>

    <div class="mt-8">
      <h2 class="text-xl font-bold mb-4">Invoice History</h2>
      <UTable :rows="formattedInvoices" :columns="invoiceColumns">
        <template #status-data="{ row }">
          <UBadge :color="row.status === 'PAID' ? 'success' : 'warning'">{{ row.status }}</UBadge>
        </template>
        <template #actions-data="{ row }">
          <UButton variant="ghost" @click="downloadInvoice(row)">Download</UButton>
        </template>
      </UTable>
    </div>
  </div>
</template>
