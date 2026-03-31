<script setup lang="ts">
const msgs = [{id:1, content: 'Please review APP-1002 ASAP.', from: 'System Admin'}]
</script>
<template>
  <div class="space-y-6">
    <DashboardBreadcrumb :breadcrumbs="[{label: 'Reviewer', to: '/dashboard/reviewer'}, {label: 'Messages'}]" />
    <h1 class="text-3xl font-bold">Communications</h1>
    <UCard>
       <div v-for="m in msgs" :key="m.id" class="p-4 border-b border-gray-100 dark:border-gray-800">
         <div class="font-bold">{{m.from}}</div>
         <div>{{m.content}}</div>
       </div>
    </UCard>
  </div>
</template>
