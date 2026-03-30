<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Settings</h1>
    <div class="space-y-8">
      <UCard>
        <template #header>
          <h2 class="text-xl font-semibold">General Settings</h2>
        </template>
        <div class="space-y-4">
          <UFormGroup label="Site Name" name="siteName">
            <UInput v-model="settings.siteName" />
          </UFormGroup>
          <UFormGroup label="Timezone" name="timezone">
            <USelect v-model="settings.timezone" :options="['UTC-12', 'UTC-11', 'UTC-10', 'UTC-9', 'UTC-8']" />
          </UFormGroup>
        </div>
        <template #footer>
          <UButton @click="saveGeneralSettings" label="Save" />
        </template>
      </UCard>

      <UCard>
        <template #header>
          <h2 class="text-xl font-semibold">Notification Settings</h2>
        </template>
        <div class="space-y-4">
          <UCheckbox v-model="settings.notifications.email" label="Email Notifications" />
          <UCheckbox v-model="settings.notifications.sms" label="SMS Notifications" />
        </div>
        <template #footer>
          <UButton @click="saveNotificationSettings" label="Save" />
        </template>
      </UCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';

const settings = reactive({
  siteName: 'AIMS App',
  timezone: 'UTC-8',
  notifications: {
    email: true,
    sms: false,
  },
});

function saveGeneralSettings() {
  console.log('Saving general settings:', settings);
}

function saveNotificationSettings() {
  console.log('Saving notification settings:', settings.notifications);
}
</script>
