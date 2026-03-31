<template>
  <div>
    <PageHeader title="Admin Dashboard" :breadcrumbs="[{label: 'Dashboard', to: '/dashboard'}, {label: 'Admin Overview'}]" />
    
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      <UCard>
        <p class="text-sm text-gray-500 font-medium">Pending Applications</p>
        <p class="text-3xl font-bold mt-2">12</p>
      </UCard>
      <UCard>
        <p class="text-sm text-gray-500 font-medium">Active Assessors</p>
        <p class="text-3xl font-bold mt-2 text-primary-600">8</p>
      </UCard>
      <UCard>
        <p class="text-sm text-gray-500 font-medium">Overdue Invoices</p>
        <p class="text-3xl font-bold mt-2 text-red-500">4</p>
      </UCard>
      <UCard>
        <p class="text-sm text-gray-500 font-medium">Open Support Tickets</p>
        <p class="text-3xl font-bold mt-2 text-yellow-500">7</p>
      </UCard>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <UCard>
        <template #header><h3 class="font-bold">Recent System Activity</h3></template>
        <ul class="space-y-4">
          <li class="flex items-start gap-3">
             <UIcon name="i-heroicons-document-check" class="text-green-500 w-5 h-5 mt-0.5" />
             <div>
               <p class="text-sm font-medium">Application APP-2026-04 Approved</p>
               <p class="text-xs text-gray-500">2 mins ago by John Doe</p>
             </div>
          </li>
          <li class="flex items-start gap-3">
             <UIcon name="i-heroicons-user-plus" class="text-primary-500 w-5 h-5 mt-0.5" />
             <div>
               <p class="text-sm font-medium">New Applicant Registered (Tech Corp)</p>
               <p class="text-xs text-gray-500">1 hour ago</p>
             </div>
          </li>
        </ul>
      </UCard>
      <UCard>
        <template #header><h3 class="font-bold">Quick Actions</h3></template>
        <div class="grid grid-cols-2 gap-4">
           <UButton to="/dashboard/pages/admin/invoices" color="gray" icon="i-heroicons-credit-card" label="Manage Invoices" class="justify-start" />
           <UButton to="/dashboard/pages/admin/support" color="gray" icon="i-heroicons-lifebuoy" label="Helpdesk" class="justify-start" />
        </div>
      </UCard>
    </div>
  </div>
</template>
<script setup lang="ts">
import PageHeader from '~/app/components/shared/PageHeader.vue'
</script>
