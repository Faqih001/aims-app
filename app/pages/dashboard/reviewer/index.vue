<template>
  <div>
    <PageHeader title="Reviewer Dashboard" :breadcrumbs="[{label: 'Dashboard', to: '/dashboard'}, {label: 'Reviewer Overview'}]" />
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <UCard>
        <p class="text-sm text-gray-500 font-medium">Assigned Applications</p>
        <p class="text-3xl font-bold mt-2 text-primary-600">3</p>
      </UCard>
      <UCard>
        <p class="text-sm text-gray-500 font-medium">Assessments Completed</p>
        <p class="text-3xl font-bold mt-2">14</p>
      </UCard>
      <UCard>
        <p class="text-sm text-gray-500 font-medium">Upcoming Scheduled</p>
        <p class="text-3xl font-bold mt-2">2</p>
      </UCard>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <UCard :ui="{ body: { padding: 'p-0' } }">
        <template #header><h3 class="font-bold">Next Assessment</h3></template>
        <div class="p-6 text-center">
            <UIcon name="i-heroicons-calendar" class="w-12 h-12 text-primary-500 mb-2" />
            <h4 class="font-bold text-lg">Tech Corp ISO 9001</h4>
            <p class="text-gray-500 mb-4">Scheduled for Next Tuesday, 10:00 AM</p>
            <UButton to="/dashboard/reviewer/assignments" color="primary" label="View Application Details" />
        </div>
      </UCard>
      <UCard>
        <template #header><h3 class="font-bold">Action Center</h3></template>
        <div class="space-y-3 flex flex-col">
           <UButton to="/dashboard/reviewer/assignments" color="gray" variant="ghost" icon="i-heroicons-view-columns" label="Kanban Board" class="justify-start border" />
           <UButton to="/dashboard/reviewer/schedule" color="gray" variant="ghost" icon="i-heroicons-calendar-days" label="Manage Schedule" class="justify-start border" />
        </div>
      </UCard>
    </div>
  </div>
</template>
<script setup lang="ts">
</script>
