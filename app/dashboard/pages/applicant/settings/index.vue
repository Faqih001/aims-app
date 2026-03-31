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
