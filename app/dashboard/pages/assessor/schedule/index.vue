<script setup lang="ts">
const authStore = useAuthStore();
const { data: schedule, pending, error } = useFetch(`/api/assessors/${authStore.user?.id}/schedule`);
</script>

<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">My Schedule</h1>
    <div v-if="pending">Loading schedule...</div>
    <div v-else-if="error">Error loading schedule.</div>
    <div v-else class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <UCard v-for="item in schedule" :key="item.id">
        <template #header>
          <div class="flex items-center justify-between">
            <h2 class="text-lg font-semibold">{{ item.application?.organization?.name ?? 'Application' }}</h2>
            <UBadge :color="item.status === 'COMPLETED' ? 'success' : 'primary'">{{ item.status }}</UBadge>
          </div>
        </template>
        <div class="space-y-2">
          <p><strong>When:</strong> {{ new Date(item.scheduledAt).toLocaleString() }}</p>
          <p><strong>Duration:</strong> {{ item.durationMinutes }} mins</p>
          <p><strong>Timezone:</strong> {{ item.timezone }}</p>
          <p v-if="item.notes"><strong>Notes:</strong> {{ item.notes }}</p>
        </div>
      </UCard>
    </div>
  </div>
</template>
