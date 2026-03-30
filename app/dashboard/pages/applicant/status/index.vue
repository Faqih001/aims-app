<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Application Status</h1>
    <UCard>
      <template #header>
        <h2 class="text-xl font-semibold">Your Application #12345</h2>
      </template>
      
      <div class="space-y-4">
        <p><strong>Status:</strong> <UBadge :color="statusColor">{{ currentStatus }}</UBadge></p>
        <p><strong>Submitted On:</strong> October 26, 2023</p>
        <p><strong>Last Updated:</strong> October 27, 2023</p>
      </div>

      <div class="mt-6">
        <h3 class="font-semibold mb-2">Status History</h3>
        <ul class="border-l-2 border-gray-300 ml-2">
          <li v-for="(status, index) in statusHistory" :key="index" class="mb-4 ml-6">
            <span class="absolute flex items-center justify-center w-6 h-6 bg-blue-200 rounded-full -left-3 ring-8 ring-white">
              <svg class="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path></svg>
            </span>
            <h4 class="font-semibold">{{ status.name }}</h4>
            <p class="text-sm text-gray-500">{{ status.date }}</p>
          </li>
        </ul>
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const statusHistory = ref([
  { name: 'Submitted', date: 'October 26, 2023' },
  { name: 'In Review', date: 'October 27, 2023' },
  { name: 'Pending Additional Documents', date: 'October 28, 2023' },
]);

const currentStatus = computed(() => statusHistory.value[statusHistory.value.length - 1].name);

const statusColor = computed(() => {
  switch (currentStatus.value) {
    case 'Submitted':
      return 'gray';
    case 'In Review':
      return 'orange';
    case 'Pending Additional Documents':
      return 'yellow';
    case 'Approved':
      return 'green';
    case 'Rejected':
      return 'red';
    default:
      return 'gray';
  }
});
</script>
