<script setup lang="ts">
const settings = ref({ alerts: true, theme: 'dark' });
</script>
<template>
  <div>
    <DashboardBreadcrumb :breadcrumbs="[{label: 'Applicant', to: '/dashboard/applicant'}, {label: 'Settings'}]" />
    <h1 class="text-3xl font-bold mb-4">Account Settings</h1>
    <UCard>
      <div class="space-y-4">
        <UFormGroup label="Enable Email Alerts">
          <UToggle v-model="settings.alerts" />
        </UFormGroup>
        <UFormGroup label="App Theme">
          <USelect v-model="settings.theme" :options="[{label: 'Dark', value: 'dark'}, {label: 'Light', value: 'light'}]" />
        </UFormGroup>
      </div>
    </UCard>
  </div>
</template>
