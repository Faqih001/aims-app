<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">My Invoices</h1>
    <UTable :rows="invoices" :columns="columns">
      <template #status-data="{ row }">
        <UBadge :color="row.status === 'Paid' ? 'green' : 'red'">{{ row.status }}</UBadge>
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
  { key: 'amount', label: 'Amount' },
  { key: 'status', label: 'Status' },
  { key: 'actions', label: 'Actions' },
];

const invoices = ref([
  { invoiceId: 'INV-001', date: '2023-10-28', amount: '$500.00', status: 'Paid' },
  { invoiceId: 'INV-004', date: '2023-09-10', amount: '$150.00', status: 'Paid' },
]);

function viewInvoice(invoice: any) {
  console.log('Viewing invoice:', invoice);
}

function downloadInvoice(invoice: any) {
  console.log('Downloading invoice:', invoice);
}
</script>
