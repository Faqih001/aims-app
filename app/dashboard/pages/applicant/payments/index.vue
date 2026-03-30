<script setup lang="ts">
import { ref } from 'vue';

interface Payment {
  transactionId: string;
  date: string;
  amount: string;
  status: string;
}

const columns = [
  { key: 'transactionId', label: 'Transaction ID' },
  { key: 'date', label: 'Date' },
  { key: 'amount', label: 'Amount' },
  { key: 'status', label: 'Status' },
  { key: 'actions', label: 'Actions' },
];

const payments = ref<Payment[]>([
  { transactionId: 'PAY-123', date: '2023-10-28', amount: '$500.00', status: 'Completed' },
  { transactionId: 'PAY-126', date: '2023-09-10', amount: '$150.00', status: 'Completed' },
]);

function viewDetails(payment: Payment) {
  console.log('Viewing payment details:', payment);
}
</script>

<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">My Payments</h1>
    <UTable :rows="payments" :columns="columns">
      <template #status-data="{ row }">
        <UBadge :color="(row as Payment).status === 'Completed' ? 'success' : 'warning'">{{ (row as Payment).status }}</UBadge>
      </template>
      <template #actions-data="{ row }">
        <UButton variant="ghost" @click="viewDetails(row as Payment)">View Details</UButton>
      </template>
    </UTable>
  </div>
</template>
