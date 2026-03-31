<script setup lang="ts">
const authStore = useAuthStore();
const { data: reviews, pending, error } = useFetch<any>(`/api/reviewers/${authStore.user?.id}/reviews`);

const totalReviews = computed(() => reviews.value?.length ?? 0);
const latestRecommendation = computed(() => reviews.value?.[0]?.recommendation ?? 'n/a');
</script>

<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">My Reports</h1>
    <div v-if="pending">Loading...</div>
    <div v-else-if="error">Error loading reports.</div>
    <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <UCard>
        <template #header>
          <h2 class="text-xl font-semibold">My Review Activity</h2>
        </template>
        <p class="text-3xl font-bold">{{ totalReviews }}</p>
        <template #footer>
          <p class="text-sm text-gray-500">Total reviews submitted</p>
        </template>
      </UCard>

      <UCard>
        <template #header>
          <h2 class="text-xl font-semibold">Latest Recommendation</h2>
        </template>
        <p class="text-3xl font-bold capitalize">{{ latestRecommendation }}</p>
        <template #footer>
          <p class="text-sm text-gray-500">Based on your most recent review</p>
        </template>
      </UCard>
    </div>
  </div>
</template>
