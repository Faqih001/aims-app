<script setup lang="ts">
import { ref } from 'vue';
import type { TableColumn } from '@nuxt/ui/dist/runtime/types';

interface Invoice {
  id: number;
  date: string;
  amount: string;
  status: string;
}

const invoiceColumns: TableColumn[] = [
  { key: 'date', label: 'Date' },
  { key: 'amount', label: 'Amount' },
  { key: 'status', label: 'Status' },
  { key: 'actions', label: 'Actions' },
];

const invoices = ref<Invoice[]>([
  { id: 1, date: 'October 1, 2023', amount: '$999.00', status: 'Paid' },
  { id: 2, date: 'September 1, 2023', amount: '$999.00', status: 'Paid' },
  { id: 3, date: 'August 1, 2023', amount: '$999.00', status: 'Paid' },
]);

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
      <UTable :rows="invoices" :columns="invoiceColumns">
        <template #actions-data="{ row }: { row: Invoice }">
          <UButton variant="ghost" icon="i-heroicons-arrow-down-tray" @click="downloadInvoice(row)" />
        </template>
      </UTable>
    </div>
  </div>
</template>
