<script setup lang="ts">
import { computed } from 'vue';
const authStore = useAuthStore();
const { data: application, pending, error } = useFetch(`/api/users/${authStore.user?.id}/status`);

const statusColor = computed(() => {
  if (!application.value) return 'gray';
  switch (application.value.status) {
    case 'submitted':
      return 'gray';
    case 'in-review':
      return 'orange';
    case 'approved':
      return 'green';
    case 'rejected':
      return 'red';
    default:
      return 'gray';
  }
});
</script>

<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Application Status</h1>
    <div v-if="pending">
      <p>Loading application status...</p>
    </div>
    <div v-else-if="error || !application">
      <p>Could not load application status.</p>
    </div>
    <UCard v-else>
      <template #header>
        <h2 class="text-xl font-semibold">Your Application for {{ application.organization.name }}</h2>
      </template>
      
      <div class="space-y-4">
        <p><strong>Status:</strong> <UBadge :color="statusColor">{{ application.status }}</UBadge></p>
        <p><strong>Submitted On:</strong> {{ new Date(application.createdAt).toLocaleDateString() }}</p>
        <p><strong>Last Updated:</strong> {{ new Date(application.updatedAt).toLocaleDateString() }}</p>
      </div>
    </UCard>
  </div>
</template>
