<script setup lang="ts">
const authStore = useAuthStore();
const { data: feedback, pending, error } = useFetch(`/api/users/${authStore.user?.id}/feedback`);
</script>

<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Application Feedback</h1>
    <div v-if="pending">
      <p>Loading feedback...</p>
    </div>
    <div v-else-if="error">
      <p>Error loading feedback.</p>
    </div>
    <div class="space-y-4" v-else>
      <UCard v-for="item in feedback" :key="item.id">
        <template #header>
          <div class="flex justify-between items-center">
            <h2 class="text-xl font-semibold">Feedback from {{ item.user.fullName }}</h2>
            <p class="text-sm text-gray-500">{{ new Date(item.createdAt).toLocaleDateString() }}</p>
          </div>
        </template>
        <p>{{ item.notes }}</p>
      </UCard>
      <div v-if="feedback.length === 0">
        <p>No feedback has been provided on your application yet.</p>
      </div>
    </div>
  </div>
</template>
