<template>
  <div>
    <PageHeader title="Applicant Dashboard" :breadcrumbs="[{label: 'Dashboard', to: '/dashboard'}, {label: 'Overview'}]" />
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <UCard class="bg-primary-50 dark:bg-primary-900/20 border-primary-200">
        <p class="text-sm text-primary-700 dark:text-primary-300 font-medium">Current Status</p>
        <p class="text-2xl font-bold mt-2 text-primary-900 dark:text-primary-100">Reviewing</p>
      </UCard>
      <UCard>
        <p class="text-sm text-gray-500 font-medium">Pending Invoices</p>
        <p class="text-3xl font-bold mt-2 text-yellow-600">1</p>
      </UCard>
      <UCard>
        <p class="text-sm text-gray-500 font-medium">Uploaded Documents</p>
        <p class="text-3xl font-bold mt-2">4</p>
      </UCard>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <UCard>
        <template #header><h3 class="font-bold">Next Steps Required</h3></template>
        <UAlert icon="i-heroicons-credit-card" title="Action Pending" description="Please pay your initial registration invoice to proceed." color="yellow" variant="subtle">
           <template #footer><UButton color="yellow" label="Go to Billing" to="/dashboard/pages/applicant/billing" class="mt-2" /></template>
        </UAlert>
      </UCard>
      <UCard>
        <template #header><h3 class="font-bold">Quick Links</h3></template>
        <div class="space-y-3 flex flex-col">
           <UButton to="/dashboard/pages/applicant/applications" color="gray" variant="ghost" icon="i-heroicons-document-text" label="My Applications" class="justify-start border" />
           <UButton to="/dashboard/pages/applicant/documents" color="gray" variant="ghost" icon="i-heroicons-folder-open" label="Document Manager" class="justify-start border" />
           <UButton to="/dashboard/pages/applicant/status" color="gray" variant="ghost" icon="i-heroicons-chart-bar" label="Live Tracker" class="justify-start border" />
        </div>
      </UCard>
    </div>
  </div>
</template>
<script setup lang="ts">
import PageHeader from '~/app/components/shared/PageHeader.vue'
</script>
