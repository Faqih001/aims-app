<script setup lang="ts">
import { ref, reactive } from 'vue';
import type { TableColumn } from '@nuxt/ui/dist/runtime/types';

interface Payment {
    date: string;
    amount: string;
    status: string;
}

const paymentForm = reactive({
  amount: 0,
});

const paymentHistoryColumns: TableColumn[] = [
  { key: 'date', label: 'Date' },
  { key: 'amount', label: 'Amount' },
  { key: 'status', label: 'Status' },
];

const paymentHistory = ref<Payment[]>([
  { date: '2023-10-28', amount: '$500.00', status: 'Completed' },
  { date: '2023-09-10', amount: '$150.00', status: 'Completed' },
]);

function makePayment() {
  console.log('Making payment:', paymentForm);
  paymentHistory.value.unshift({
    date: new Date().toISOString().split('T')[0] || '',
    amount: `$${paymentForm.amount.toFixed(2)}`,
    status: 'Processing',
  });
  paymentForm.amount = 0;
}
</script>

<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">My Billing</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
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
          <h2 class="text-xl font-semibold">Make a Payment</h2>
        </template>
        <UForm :state="paymentForm" @submit="makePayment">
          <UFormGroup label="Amount" name="amount">
            <UInput v-model="paymentForm.amount" type="number" />
          </UFormGroup>
          <UButton type="submit" label="Pay Now" class="mt-4" />
        </UForm>
      </UCard>
    </div>
    <div class="mt-8">
      <h2 class="text-xl font-bold mb-4">Payment History</h2>
      <UTable :rows="paymentHistory" :columns="paymentHistoryColumns" />
    </div>
  </div>
</template>
