<script setup lang="ts">
import { ref } from 'vue'

const items = ref([
  { date: '2026-04-05', task: 'Review Committee Meeting', status: 'Upcoming' },
  { date: '2026-04-10', task: 'Application APP-1092 Deadline', status: 'Critical' },
])
</script>
<template>
  <div class="space-y-6">
    <DashboardBreadcrumb :breadcrumbs="[{label: 'Reviewer', to: '/dashboard/reviewer'}, {label: 'Schedule'}]" />
    <h1 class="text-3xl font-bold">Review Schedule</h1>
    <UCard>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <UCard v-for="(item, i) in items" :key="i" class="bg-gray-50 dark:bg-gray-800">
          <div class="text-sm text-primary font-bold">{{ item.date }}</div>
          <div class="text-lg mt-1">{{ item.task }}</div>
          <UBadge :color="item.status === 'Critical' ? 'red' : 'primary'" class="mt-2">{{ item.status }}</UBadge>
        </UCard>
      </div>
    </UCard>
  </div>
</template>
