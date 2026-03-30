<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Invoices</h1>
    <UTable :rows="formattedInvoices" :columns="columns">
      <template #status-data="{ row }">
        <UBadge :color="row.status === 'PAID' ? 'success' : 'warning'">{{ row.status }}</UBadge>
      </template>
      <template #actions-data="{ row }">
        <UButton variant="ghost" @click="viewInvoice(row as Invoice)">View</UButton>
        <UButton variant="ghost" @click="downloadInvoice(row as Invoice)">Download</UButton>
      </template>
    </UTable>
  </div>
</template>

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

const columns = [
  { key: 'id', label: 'Invoice ID' },
  { key: 'formattedDate', label: 'Date' },
  { key: 'user.name', label: 'User' },
  { key: 'amount', label: 'Amount' },
  { key: 'status', label: 'Status' },
  { key: 'actions', label: 'Actions' },
];

const { data: invoices, pending, error, refresh } = await useFetch('/api/admin/billing');

const formattedInvoices = computed(() => {
  if (!invoices.value) return [];
  return invoices.value.map(invoice => ({
    ...invoice,
    formattedDate: dayjs(invoice.date).format('YYYY-MM-DD'),
  }));
});

function viewInvoice(invoice: Invoice) {
  console.log('Viewing invoice:', invoice);
}

function downloadInvoice(invoice: Invoice) {
  console.log('Downloading invoice:', invoice);
}
</script>

<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Invoices</h1>
    <UTable :rows="formattedInvoices" :columns="columns">
      <template #status-data="{ row }">
        <UBadge :color="row.status === 'PAID' ? 'success' : 'warning'">{{ row.status }}</UBadge>
      </template>
      <template #actions-data="{ row }">
        <UButton variant="ghost" @click="viewInvoice(row as Invoice)">View</UButton>
        <UButton variant="ghost" @click="downloadInvoice(row as Invoice)">Download</UButton>
      </template>
    </UTable>
  </div>
</template>
