<script setup lang="ts">
const authStore = useAuthStore();
const { data: payments, pending, error } = useFetch(`/api/users/${authStore.user?.id}/payments`);

const columns = [
  { key: 'id', label: 'Transaction ID' },
  { key: 'createdAt', label: 'Date' },
  { key: 'amount', label: 'Amount' },
  { key: 'status', label: 'Status' },
  { key: 'actions', label: 'Actions' },
];

function viewDetails(payment: any) {
  console.log('Viewing payment details:', payment);
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
    <h1 class="text-2xl font-bold mb-4">My Payments</h1>
    <UTable :rows="payments" :columns="columns" :loading="pending">
      <template #status-data="{ row }">
        <UBadge :color="row.status === 'completed' ? 'success' : 'warning'">{{ row.status }}</UBadge>
      </template>
      <template #amount-data="{ row }">
        {{ formatCurrency(row.amount) }}
      </template>
      <template #actions-data="{ row }">
        <UButton variant="ghost" @click="viewDetails(row)">View Details</UButton>
      </template>
    </UTable>
  </div>
</template>
