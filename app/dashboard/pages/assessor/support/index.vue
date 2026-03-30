<script setup lang="ts">
import { ref, reactive } from 'vue';

interface Ticket {
  id: string;
  subject: string;
  status: string;
  lastUpdate: string;
}

const columns = [
  { key: 'id', label: 'Ticket ID' },
  { key: 'subject', label: 'Subject' },
  { key: 'status', label: 'Status' },
  { key: 'lastUpdate', label: 'Last Update' },
  { key: 'actions', label: 'Actions' },
];

const tickets = ref<Ticket[]>([
  { id: 'TKT-004', subject: 'Question about assessment criteria', status: 'Closed', lastUpdate: '5 days ago' },
]);

const isModalOpen = ref(false);
const newTicket = reactive({
  subject: '',
  message: '',
});

function submitTicket() {
  console.log('Submitting new ticket:', newTicket);
  tickets.value.unshift({
    id: `TKT-00${tickets.value.length + 5}`,
    subject: newTicket.subject,
    status: 'Open',
    lastUpdate: 'Just now',
  });
  isModalOpen.value = false;
  newTicket.subject = '';
  newTicket.message = '';
}

function viewTicket(ticket: Ticket) {
  console.log('Viewing ticket:', ticket);
}
</script>

<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">My Support Tickets</h1>
    <div class="flex justify-end mb-4">
      <UButton @click="isModalOpen = true">Create New Ticket</UButton>
    </div>
    <UTable<Ticket> :rows="tickets" :columns="columns">
      <template #actions-data="{ row }">
        <UButton variant="ghost" @click="viewTicket(row)">View</UButton>
      </template>
    </UTable>

    <UModal v-model="isModalOpen">
      <UCard>
        <template #header>
          <h2 class="text-xl font-semibold">Create Support Ticket</h2>
        </template>
        <UForm :state="newTicket" @submit="submitTicket">
          <UFormGroup label="Subject" name="subject">
            <UInput v-model="newTicket.subject" />
          </UFormGroup>
          <UFormGroup label="Message" name="message">
            <UTextarea v-model="newTicket.message" />
          </UFormGroup>
          <UButton type="submit" label="Submit" class="mt-4" />
        </UForm>
      </UCard>
    </UModal>
  </div>
</template>
