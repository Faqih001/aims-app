<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Support Tickets</h1>
    <UTable :rows="tickets" :columns="columns">
      <template #actions-data="{ row }">
        <UButton variant="ghost" @click="viewTicket(row as Ticket)">View</UButton>
      </template>
    </UTable>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface Ticket {
  id: string;
  subject: string;
  user: string;
  status: string;
  lastUpdate: string;
}

const columns = [
  { key: 'id', label: 'Ticket ID' },
  { key: 'subject', label: 'Subject' },
  { key: 'user', label: 'User' },
  { key: 'status', label: 'Status' },
  { key: 'lastUpdate', label: 'Last Update' },
  { key: 'actions', label: 'Actions' },
];

const tickets = ref<Ticket[]>([
  { id: 'TKT-001', subject: 'Cannot login', user: 'john.doe@example.com', status: 'Open', lastUpdate: '2 hours ago' },
  { id: 'TKT-002', subject: 'Billing issue', user: 'jane.doe@example.com', status: 'In Progress', lastUpdate: '1 day ago' },
  { id: 'TKT-003', subject: 'Feature request', user: 'admin@example.com', status: 'Closed', lastUpdate: '3 days ago' },
]);

function viewTicket(ticket: Ticket) {
  console.log('Viewing ticket:', ticket);
  // Here you would navigate to a detailed ticket view
}
</script>
