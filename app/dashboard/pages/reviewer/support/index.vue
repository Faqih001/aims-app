<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">My Support Tickets</h1>
    <div class="flex justify-end mb-4">
      <UButton @click="isModalOpen = true">Create New Ticket</UButton>
    </div>
    <UTable :rows="tickets" :columns="columns">
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

<script setup lang="ts">
import { ref, reactive } from 'vue';

const columns = [
  { key: 'id', label: 'Ticket ID' },
  { key: 'subject', label: 'Subject' },
  { key: 'status', label: 'Status' },
  { key: 'lastUpdate', label: 'Last Update' },
  { key: 'actions', label: 'Actions' },
];

const tickets = ref([
  { id: 'TKT-005', subject: 'Clarification on review guidelines', status: 'In Progress', lastUpdate: '1 day ago' },
]);

const isModalOpen = ref(false);
const newTicket = reactive({
  subject: '',
  message: '',
});

function submitTicket() {
  console.log('Submitting new ticket:', newTicket);
  tickets.value.unshift({
    id: `TKT-00${tickets.value.length + 6}`,
    subject: newTicket.subject,
    status: 'Open',
    lastUpdate: 'Just now',
  });
  isModalOpen.value = false;
  newTicket.subject = '';
  newTicket.message = '';
}

function viewTicket(ticket: any) {
  console.log('Viewing ticket:', ticket);
}
</script>
