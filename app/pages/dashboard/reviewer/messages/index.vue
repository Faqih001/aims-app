<script setup lang="ts">
import { ref } from 'vue'

const messages = ref([
  { id: 1, from: 'Admin Desk', subject: 'Application APP-2026-001 needs your attention', date: '2 hours ago', read: false, snippet: 'Please review the new compliance documents uploaded...' },
  { id: 2, from: 'System System', subject: 'Weekly Digest', date: '1 day ago', read: true, snippet: 'You have 3 upcoming assignments scheduled for next week.' }
])

const isComposing = ref(false)
const composeForm = ref({ to: '', subject: '', body: '' })

</script>
<template>
  <div class="space-y-6">
    <DashboardBreadcrumb :breadcrumbs="[{label: 'Reviewer', to: '/dashboard/reviewer'}, {label: 'Messages'}]" />
    <div class="flex justify-between items-center">
      <h1 class="text-3xl font-bold">Reviewer Communications</h1>
      <UButton icon="i-heroicons-envelope" @click="isComposing = true">New Message</UButton>
    </div>
    
    <UCard>
      <div class="divide-y divide-gray-200 dark:divide-gray-800">
        <div v-for="msg in messages" :key="msg.id" class="p-4 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer flex gap-4 transition-colors">
          <div class="mt-1">
            <UIcon :name="msg.read ? 'i-heroicons-envelope-open' : 'i-heroicons-envelope'" :class="msg.read ? 'text-gray-400' : 'text-primary-500'" class="w-6 h-6" />
          </div>
          <div class="flex-1">
            <div class="flex justify-between">
              <h4 :class="['font-medium', msg.read ? 'text-gray-600 dark:text-gray-400' : 'text-black dark:text-white']">{{ msg.from }}</h4>
              <span class="text-xs text-gray-500">{{ msg.date }}</span>
            </div>
            <p :class="['text-sm mt-1', msg.read ? 'text-gray-500' : 'font-medium text-gray-900 dark:text-gray-100']">{{ msg.subject }}</p>
            <p class="text-sm text-gray-500 truncate mt-1">{{ msg.snippet }}</p>
          </div>
        </div>
      </div>
    </UCard>

    <UModal v-model="isComposing">
      <UCard>
        <template #header><h3 class="font-bold">Compose Message</h3></template>
        <UFormGroup label="To" class="mb-4"><UInput v-model="composeForm.to" placeholder="e.g. Assessment Coordinator" /></UFormGroup>
        <UFormGroup label="Subject" class="mb-4"><UInput v-model="composeForm.subject" /></UFormGroup>
        <UFormGroup label="Message" class="mb-6"><UTextarea v-model="composeForm.body" rows="4" /></UFormGroup>
        <template #footer>
          <div class="flex justify-end gap-2">
            <UButton variant="ghost" color="gray" @click="isComposing = false">Cancel</UButton>
            <UButton color="primary" @click="isComposing = false">Send Message</UButton>
          </div>
        </template>
      </UCard>
    </UModal>
  </div>
</template>
