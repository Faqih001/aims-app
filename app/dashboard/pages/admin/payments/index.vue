<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Payments</h1>
    <UTable :rows="payments" :columns="columns">
      <template #status-data="{ row }">
        <UBadge :color="row.status === 'Completed' ? 'green' : 'red'">{{ row.status }}</UBadge>
      </template>
      <template #actions-data="{ row }">
        <UButton variant="ghost" @click="viewDetails(row)">View Details</UButton>
      </template>
    </UTable>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const columns = [
  { key: 'transactionId', label: 'Transaction ID' },
  { key: 'date', label: 'Date' },
  { key: 'user', label: 'User' },
  { key: 'amount', label: 'Amount' },
  { key: 'status', label: 'Status' },
  { key: 'actions', label: 'Actions' },
];

const payments = ref([
  { transactionId: 'PAY-123', date: '2023-10-28', user: 'john.doe@example.com', amount: '$500.00', status: 'Completed' },
  { transactionId: 'PAY-124', date: '2023-10-27', user: 'sara.k@example.com', amount: '$1500.00', status: 'Completed' },
  { transactionId: 'PAY-125', date: '2023-10-26', user: 'mike.p@example.com', amount: '$500.00', status: 'Failed' },
]);

function viewDetails(payment: any) {
  console.log('Viewing payment details:', payment);
}
</script>
