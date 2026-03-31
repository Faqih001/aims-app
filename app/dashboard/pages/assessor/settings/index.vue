<script setup lang="ts">
import { reactive, ref } from 'vue'

const profile = reactive({
  name: 'Assessor User',
  email: 'assessor@aimsapp.com',
  timezone: 'UTC+3',
  notifications: true
})
const saving = ref(false)

function saveProfile() {
  saving.value = true
  setTimeout(() => { saving.value = false }, 800)
}
</script>
<template>
  <div class="space-y-6">
    <DashboardBreadcrumb :breadcrumbs="[{label: 'Assessor', to: '/dashboard/assessor'}, {label: 'Settings'}]" />
    <h1 class="text-3xl font-bold">Preferences</h1>
    <UCard class="max-w-2xl">
      <UForm :state="profile" class="space-y-4" @submit="saveProfile">
        <UFormGroup label="Full Name"><UInput v-model="profile.name" /></UFormGroup>
        <UFormGroup label="Email Address"><UInput v-model="profile.email" type="email" /></UFormGroup>
        <UFormGroup label="Timezone">
          <USelect v-model="profile.timezone" :options="['UTC-5', 'UTC', 'UTC+3', 'UTC+8']" />
        </UFormGroup>
        <UFormGroup label="Email Notifications border-t pt-4">
          <UToggle v-model="profile.notifications" />
        </UFormGroup>
        <div class="mt-4"><UButton type="submit" :loading="saving" color="primary">Update Settings</UButton></div>
      </UForm>
    </UCard>
  </div>
</template>
