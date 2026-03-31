<script setup lang="ts">
import { reactive, ref } from 'vue'

const prefs = reactive({ interface: 'dark', digest: 'weekly' })
const isSaving = ref(false)
</script>
<template>
  <div class="space-y-6">
    <DashboardBreadcrumb :breadcrumbs="[{label: 'Reviewer', to: '/dashboard/reviewer'}, {label: 'Settings'}]" />
    <h1 class="text-3xl font-bold">Reviewer Settings</h1>
    <UCard class="max-w-xl space-y-4">
      <UFormGroup label="Interface Theme"><USelect v-model="prefs.interface" :options="['light', 'dark', 'system']" /></UFormGroup>
      <UFormGroup label="Email Digest Frequency"><USelect v-model="prefs.digest" :options="['daily', 'weekly', 'never']" /></UFormGroup>
      <UButton @click="isSaving = true; setTimeout(() => isSaving=false, 1000)" :loading="isSaving">Save Preferences</UButton>
    </UCard>
  </div>
</template>
