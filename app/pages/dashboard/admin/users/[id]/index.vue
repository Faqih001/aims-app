<script setup lang="ts">
import { ref } from 'vue'
const route = useRoute()

const userId = route.params.id
const userState = ref({
  id: userId,
  name: 'Jane Smith',
  email: 'jane@example.com',
  role: 'Assessor',
  status: 'Active',
  joined: '2025-05-12'
})

const activityLogs = ref([
  { id: 1, action: 'Logged In', date: '2026-03-31 09:00' },
  { id: 2, action: 'Reviewed Document DOC-001', date: '2026-03-30 14:22' }
])
</script>

<template>
  <div class="space-y-6">
    <DashboardBreadcrumb :breadcrumbs="[{label: 'Admin', to: '/dashboard/admin'}, {label: 'Users', to: '/dashboard/admin/users'}, {label: userState.name}]" />
    
    <div class="flex justify-between items-center bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-800">
      <div class="flex items-center gap-4">
        <UAvatar size="3xl" :alt="userState.name" />
        <div>
          <h1 class="text-3xl font-bold">{{ userState.name }}</h1>
          <p class="text-gray-500">{{ userState.email }}</p>
        </div>
      </div>
      <div class="flex gap-2">
        <UButton color="white" variant="solid" :to="'/dashboard/admin/users/'+userId+'/edit'">Edit User</UButton>
        <UButton color="red" variant="soft">Suspend</UButton>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <UCard>
        <template #header><h3 class="font-semibold">User Details</h3></template>
        <div class="space-y-4">
          <div><label class="text-xs text-gray-500">Role</label><p class="font-medium">{{ userState.role }}</p></div>
          <div><label class="text-xs text-gray-500">Status</label><p><UBadge color="green">{{ userState.status }}</UBadge></p></div>
          <div><label class="text-xs text-gray-500">Member Since</label><p class="font-medium">{{ userState.joined }}</p></div>
        </div>
      </UCard>
      
      <div class="md:col-span-2">
        <UCard>
          <template #header><h3 class="font-semibold">Recent Activity</h3></template>
          <UTable :rows="activityLogs" />
        </UCard>
      </div>
    </div>
  </div>
</template>
