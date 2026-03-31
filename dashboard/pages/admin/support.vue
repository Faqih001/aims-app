<template>
  <div>
    <PageHeader title="Support Helpdesk" :breadcrumbs="[{label: 'Dashboard', to: '/dashboard'}, {label: 'Support Tickets'}]" />
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 h-[70vh]">
      <!-- Ticket List -->
      <UCard :ui="{ body: { padding: 'p-0', base: 'flex flex-col h-full overflow-hidden' } }" class="md:col-span-1">
        <div class="p-4 border-b dark:border-gray-800">
          <UInput icon="i-heroicons-search" placeholder="Search tickets..." />
        </div>
        <div class="flex-1 overflow-y-auto">
          <div 
            v-for="ticket in tickets" :key="ticket.id"
            @click="activeTicket = ticket"
            class="p-4 border-b dark:border-gray-800 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition"
            :class="{ 'bg-primary-50 dark:bg-primary-900/20 border-l-4 border-l-primary-500': activeTicket?.id === ticket.id }"
          >
            <div class="flex justify-between items-start mb-1">
              <span class="font-semibold text-sm">{{ ticket.subject }}</span>
              <UBadge size="xs" :color="ticket.status === 'OPEN' ? 'red' : 'gray'">{{ ticket.status }}</UBadge>
            </div>
            <p class="text-xs text-gray-500 truncate">{{ ticket.message }}</p>
          </div>
        </div>
      </UCard>
      
      <!-- Thread View -->
      <UCard v-if="activeTicket" class="md:col-span-2 flex flex-col" :ui="{ body: { base: 'flex-1 flex flex-col p-0 overflow-hidden' } }">
        <div class="p-4 border-b dark:border-gray-800 flex justify-between items-center">
          <div>
             <h3 class="font-bold text-lg">{{ activeTicket.subject }}</h3>
             <p class="text-sm text-gray-500">Ticket #{{ activeTicket.id }}</p>
          </div>
          <UButton v-if="activeTicket.status === 'OPEN'" color="gray" label="Mark as Closed" @click="activeTicket.status = 'CLOSED'" />
        </div>
        
        <div class="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50 dark:bg-gray-900/50">
          <div class="flex gap-4">
            <UAvatar src="https://avatars.githubusercontent.com/u/101?v=4" />
            <div class="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg flex-1">
              <p class="text-sm font-semibold mb-1">Applicant User</p>
              <p class="text-sm">{{ activeTicket.message }}</p>
            </div>
          </div>
        </div>

        <div class="p-4 border-t dark:border-gray-800 flex gap-2">
          <UInput class="flex-1" placeholder="Type a response..." v-model="replyText" @keyup.enter="sendReply" />
          <UButton icon="i-heroicons-paper-airplane" color="primary" @click="sendReply" />
        </div>
      </UCard>
      <UCard v-else class="md:col-span-2 flex items-center justify-center bg-gray-50/50 dark:bg-gray-800/20">
        <div class="text-center text-gray-400">
           <UIcon name="i-heroicons-inbox" class="w-12 h-12 mx-auto mb-2 opacity-50" />
           <p>Select a ticket to view conversation</p>
        </div>
      </UCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import PageHeader from '~/components/shared/PageHeader.vue'

const tickets = ref([
  { id: 'TKT-1029', subject: 'Cannot upload PDF document', message: 'Hi there, I am receiving a 500 error when trying to submit my ISO files. Can you assist?', status: 'OPEN' },
  { id: 'TKT-1028', subject: 'Invoice Billing issue', message: 'I was accidentally double charged for the registration fee.', status: 'OPEN' },
  { id: 'TKT-1020', subject: 'Change of Assessment Scope', message: 'Need to update our scope before next week.', status: 'CLOSED' }
])

const activeTicket = ref<any>(null)
const replyText = ref('')

const sendReply = () => {
  if (!replyText.value) return;
  alert('Reply Sent: ' + replyText.value)
  replyText.value = ''
}
</script>
