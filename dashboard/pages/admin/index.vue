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

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <UCard class="md:col-span-2">
        <template #header><h3 class="font-bold">System Capabilities</h3></template>
        <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
           <UButton to="/dashboard/pages/admin/users" color="white" variant="solid" icon="i-heroicons-users" label="Users" size="lg" class="justify-center py-4 flex-col gap-2 h-auto" />
           <UButton to="/dashboard/pages/admin/applications" color="white" variant="solid" icon="i-heroicons-document-text" label="Applications" size="lg" class="justify-center py-4 flex-col gap-2 h-auto" />
           <UButton to="/dashboard/pages/admin/invoices" color="white" variant="solid" icon="i-heroicons-credit-card" label="Invoices" size="lg" class="justify-center py-4 flex-col gap-2 h-auto" />
           <UButton to="/dashboard/pages/admin/payments" color="white" variant="solid" icon="i-heroicons-currency-dollar" label="Payments" size="lg" class="justify-center py-4 flex-col gap-2 h-auto" />
           <UButton to="/dashboard/pages/admin/support" color="white" variant="solid" icon="i-heroicons-lifebuoy" label="Support" size="lg" class="justify-center py-4 flex-col gap-2 h-auto" />
           <UButton to="/dashboard/pages/admin/audits" color="white" variant="solid" icon="i-heroicons-shield-check" label="Audit Logs" size="lg" class="justify-center py-4 flex-col gap-2 h-auto" />
        </div>
      </UCard>

      <UCard>
        <template #header><h3 class="font-bold">Live Activity</h3></template>
        <ul class="space-y-4">
          <li class="flex items-start gap-3">
             <UIcon name="i-heroicons-document-check" class="text-green-500 w-5 h-5 mt-0.5" />
             <div>
               <p class="text-sm font-medium">App APP-2026-04 Approved</p>
               <p class="text-xs text-gray-500">2 mins ago by John Doe</p>
             </div>
          </li>
          <li class="flex items-start gap-3">
             <UIcon name="i-heroicons-user-plus" class="text-primary-500 w-5 h-5 mt-0.5" />
             <div>
               <p class="text-sm font-medium">New User Registered</p>
               <p class="text-xs text-gray-500">1 hour ago</p>
             </div>
          </li>
          <li class="flex items-start gap-3">
             <UIcon name="i-heroicons-banknotes" class="text-yellow-500 w-5 h-5 mt-0.5" />
             <div>
               <p class="text-sm font-medium">Payment Received ($1500)</p>
               <p class="text-xs text-gray-500">3 hours ago</p>
             </div>
          </li>
        </ul>
      </UCard>
    </div>
  </div>
</template>
<script setup lang="ts">
import PageHeader from '~/app/components/shared/PageHeader.vue'
</script>
