<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Invoices</h1>
    <UTable :rows="invoices" :columns="columns">
      <template #status-data="{ row }">
        <UBadge :color="row.status === 'Paid' ? 'green' : (row.status === 'Pending' ? 'orange' : 'red')">{{ row.status }}</UBadge>
      </template>
      <template #actions-data="{ row }">
        <UButton variant="ghost" @click="viewInvoice(row)">View</UButton>
        <UButton variant="ghost" @click="downloadInvoice(row)">Download</UButton>
      </template>
    </UTable>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const columns = [
  { key: 'invoiceId', label: 'Invoice ID' },
  { key: 'date', label: 'Date' },
  { key: 'user', label: 'User' },
  { key: 'amount', label: 'Amount' },
  { key: 'status', label: 'Status' },
  { key: 'actions', label: 'Actions' },
];

const invoices = ref([
  { invoiceId: 'INV-001', date: '2023-10-28', user: 'john.doe@example.com', amount: '$500.00', status: 'Paid' },
  { invoiceId: 'INV-002', date: '2023-10-27', user: 'sara.k@example.com', amount: '$1500.00', status: 'Paid' },
  { invoiceId: 'INV-003', date: '2023-10-29', user: 'mike.p@example.com', amount: '$750.00', status: 'Pending' },
]);

function viewInvoice(invoice: any) {
  console.log('Viewing invoice:', invoice);
}

function downloadInvoice(invoice: any) {
  console.log('Downloading invoice:', invoice);
}
</script>
