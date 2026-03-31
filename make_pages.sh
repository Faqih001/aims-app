#!/bin/bash

# Applicant: add 1
mkdir -p app/dashboard/pages/applicant/settings
cat << 'VUE' > app/dashboard/pages/applicant/settings/index.vue
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
VUE

# Assessor: add 3
for section in settings documents messages; do
  mkdir -p app/dashboard/pages/assessor/$section
  cat << VUE > app/dashboard/pages/assessor/$section/index.vue
<script setup lang="ts">
// Scaffolding for $section
</script>
<template>
  <div>
    <DashboardBreadcrumb :breadcrumbs="[{label: 'Assessor', to: '/dashboard/assessor'}, {label: '${section^}'}]" />
    <h1 class="text-3xl font-bold mb-4">Assessor ${section^}</h1>
    <UCard>
      <p>This is the ${section} dashboard interface.</p>
    </UCard>
  </div>
</template>
VUE
done

# Reviewer: add 5
for section in settings documents messages schedule history; do
  mkdir -p app/dashboard/pages/reviewer/$section
  cat << VUE > app/dashboard/pages/reviewer/$section/index.vue
<script setup lang="ts">
// Scaffolding for $section
</script>
<template>
  <div>
    <DashboardBreadcrumb :breadcrumbs="[{label: 'Reviewer', to: '/dashboard/reviewer'}, {label: '${section^}'}]" />
    <h1 class="text-3xl font-bold mb-4">Reviewer ${section^}</h1>
    <UCard>
      <p>This is the ${section} dashboard interface.</p>
    </UCard>
  </div>
</template>
VUE
done

