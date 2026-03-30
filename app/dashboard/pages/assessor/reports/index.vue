<script setup lang="ts">
const authStore = useAuthStore();
const { data: metrics, pending, error } = useFetch(`/api/assessors/${authStore.user?.id}/reports`);
</script>

<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">My Reports</h1>
    <div v-if="pending">Loading reports...</div>
    <div v-else-if="error">Error loading reports.</div>
    <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <UCard>
        <template #header>
          <h2 class="text-xl font-semibold">My Assessment Activity</h2>
        </template>
        <p class="text-3xl font-bold">{{ metrics?.totalAssessments ?? 0 }}</p>
        <template #footer>
          <p class="text-sm text-gray-500">Total assessments completed</p>
        </template>
      </UCard>

      <UCard>
        <template #header>
          <h2 class="text-xl font-semibold">Completion Rate</h2>
        </template>
        <p class="text-3xl font-bold">{{ metrics?.completionRate ?? 0 }}%</p>
        <template #footer>
          <p class="text-sm text-gray-500">Overall completion rate</p>
        </template>
      </UCard>
    </div>
  </div>
</template>
