<script setup lang="ts">
const authStore = useAuthStore();
const { data: invoices, pending, error } = useFetch(`/api/users/${authStore.user?.id}/invoices`);

const columns = [
  { key: 'id', label: 'Invoice ID' },
  { key: 'createdAt', label: 'Date' },
  { key: 'amount', label: 'Amount' },
  { key: 'status', label: 'Status' },
  { key: 'actions', label: 'Actions' },
];

function viewInvoice(invoice: any) {
  console.log('Viewing invoice:', invoice);
}

function downloadInvoice(invoice: any) {
  console.log('Downloading invoice:', invoice);
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}
</script>

<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">My Invoices</h1>
    <UTable :rows="invoices" :columns="columns" :loading="pending">
      <template #status-data="{ row }">
        <UBadge :color="row.status === 'paid' ? 'green' : 'red'">{{ row.status }}</UBadge>
      </template>
      <template #amount-data="{ row }">
        {{ formatCurrency(row.amount) }}
      </template>
      <template #actions-data="{ row }">
        <UButton variant="ghost" @click="viewInvoice(row)">View</UButton>
        <UButton variant="ghost" @click="downloadInvoice(row)">Download</UButton>
      </template>
    </UTable>
  </div>
</template>
