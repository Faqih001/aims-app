<script setup lang="ts">
import { ref } from 'vue'

const messages = ref([
  { id: 1, sender: 'Admin Team', subject: 'System downtime notice', blurb: 'System maintenance at 2 AM...', read: false, date: '10:30 AM' },
  { id: 2, sender: 'John Doe (Applicant)', subject: 'Question regarding assessment criteria', blurb: 'Do I need to submit both years?', read: true, date: 'Yesterday' }
])

const newMessage = ref('')
const composeModal = ref(false)

function sendMessage() {
  messages.value.unshift({ id: Date.now(), sender: 'Me', subject: 'New Reply', blurb: newMessage.value, read: true, date: 'Just now' })
  newMessage.value = ''
  composeModal.value = false
}
</script>
<template>
  <div class="space-y-6">
    <DashboardBreadcrumb :breadcrumbs="[{label: 'Assessor', to: '/dashboard/assessor'}, {label: 'Messages'}]" />
    <div class="flex justify-between items-center">
      <h1 class="text-3xl font-bold">Inbox</h1>
      <UButton icon="i-heroicons-pencil-square" @click="composeModal = true">Compose</UButton>
    </div>
    <UCard>
      <div class="divide-y divide-gray-200 dark:divide-gray-800">
        <div v-for="msg in messages" :key="msg.id" class="p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition cursor-pointer flex justify-between">
          <div>
            <div class="font-semibold flex items-center gap-2">
              <UIcon v-if="!msg.read" name="i-heroicons-envelope" class="text-primary-500" />
              {{ msg.sender }}
            </div>
            <div class="text-sm font-medium">{{ msg.subject }}</div>
            <div class="text-sm text-gray-500">{{ msg.blurb }}</div>
          </div>
          <div class="text-xs text-gray-400">{{ msg.date }}</div>
        </div>
      </div>
    </UCard>
    <UModal v-model="composeModal">
      <UCard>
        <template #header><h3 class="font-semibold">New Message</h3></template>
        <UFormGroup label="Message" class="mb-4">
          <UTextarea v-model="newMessage" rows="4" placeholder="Type your message here..." />
        </UFormGroup>
        <template #footer><UButton block @click="sendMessage">Send Message</UButton></template>
      </UCard>
    </UModal>
  </div>
</template>
