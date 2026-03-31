#!/bin/bash

# 1. Reviewer Messages
cat << 'VUE' > app/dashboard/pages/reviewer/messages/index.vue
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
VUE

# 2. Reviewer History
cat << 'VUE' > app/dashboard/pages/reviewer/history/index.vue
<script setup lang="ts">
import { ref } from 'vue'

const columns = [
  { key: 'id', label: 'Reference' },
  { key: 'application', label: 'Assessed Entity' },
  { key: 'outcome', label: 'Your Decision' },
  { key: 'completedAt', label: 'Date Completed' },
  { key: 'actions', label: '' }
]

const historyLogs = ref([
  { id: 'REV-099', application: 'Global Tech Inc.', outcome: 'Approved', completedAt: '2025-12-01' },
  { id: 'REV-098', application: 'Alpha Services', outcome: 'Action Required', completedAt: '2025-11-15' },
  { id: 'REV-097', application: 'Beta Manufacturing', outcome: 'Rejected', completedAt: '2025-10-30' },
])

const colorMap: Record<string, string> = {
  'Approved': 'green',
  'Action Required': 'orange',
  'Rejected': 'red'
}
</script>
<template>
  <div class="space-y-6">
    <DashboardBreadcrumb :breadcrumbs="[{label: 'Reviewer', to: '/dashboard/reviewer'}, {label: 'History'}]" />
    <h1 class="text-3xl font-bold">Review History</h1>
    <p class="text-gray-500">A complete log of past application decisions and audits you have signed off on.</p>
    
    <UCard>
      <UTable :rows="historyLogs" :columns="columns">
        <template #outcome-data="{ row }">
          <UBadge :color="colorMap[row.outcome] || 'gray'" variant="soft">{{ row.outcome }}</UBadge>
        </template>
        <template #actions-data="{ row }">
          <UButton size="xs" variant="ghost" icon="i-heroicons-document-text" title="View Review Notes" />
        </template>
      </UTable>
    </UCard>
  </div>
</template>
VUE

# 3. Applicant Settings
cat << 'VUE' > app/dashboard/pages/applicant/settings/index.vue
<script setup lang="ts">
import { ref, reactive } from 'vue'

const isLoading = ref(false)
const settings = reactive({
  alerts: true,
  theme: 'dark',
  twoFactor: false,
  language: 'en'
})

function saveSettings() {
  isLoading.value = true
  setTimeout(() => {
    isLoading.value = false
    const toast = useToast()
    if(toast) toast.add({ title: 'Settings saved', color: 'green' })
  }, 1000)
}
</script>
<template>
  <div class="space-y-6">
    <DashboardBreadcrumb :breadcrumbs="[{label: 'Applicant', to: '/dashboard/applicant'}, {label: 'Settings'}]" />
    <div>
      <h1 class="text-3xl font-bold">Account Settings</h1>
      <p class="text-gray-500 mt-2">Manage your preferences and security settings.</p>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="md:col-span-2 space-y-6">
        <UCard>
          <template #header><h3 class="font-bold">Preferences</h3></template>
          <div class="space-y-6">
            <div class="flex items-center justify-between">
              <div>
                <p class="font-medium">Email Alerts</p>
                <p class="text-sm text-gray-500">Receive status updates on your applications</p>
              </div>
              <UToggle v-model="settings.alerts" />
            </div>
            <UDivider />
            <div class="flex items-center justify-between">
              <div>
                <p class="font-medium">Interface Theme</p>
                <p class="text-sm text-gray-500">Toggle light / dark mode</p>
              </div>
              <USelect v-model="settings.theme" :options="[{label: 'Dark', value: 'dark'}, {label: 'Light', value: 'light'}]" />
            </div>
          </div>
        </UCard>

        <UCard>
          <template #header><h3 class="font-bold text-red-600">Security</h3></template>
          <div class="flex items-center justify-between">
            <div>
              <p class="font-medium">Two-Factor Authentication</p>
              <p class="text-sm text-gray-500">Secure your account with 2FA</p>
            </div>
            <UToggle v-model="settings.twoFactor" color="red" />
          </div>
        </UCard>

        <div class="flex justify-end">
          <UButton size="lg" :loading="isLoading" @click="saveSettings">Save All Settings</UButton>
        </div>
      </div>
    </div>
  </div>
</template>
VUE

