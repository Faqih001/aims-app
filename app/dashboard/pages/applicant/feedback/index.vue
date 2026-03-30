<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Application Feedback</h1>
    <div class="space-y-4">
      <UCard v-for="item in feedback" :key="item.id">
        <template #header>
          <div class="flex justify-between items-center">
            <h2 class="text-xl font-semibold">Feedback from {{ item.reviewer }}</h2>
            <p class="text-sm text-gray-500">{{ item.date }}</p>
          </div>
        </template>
        <p>{{ item.comment }}</p>
      </UCard>
      <div v-if="feedback.length === 0">
        <p>No feedback has been provided on your application yet.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const feedback = ref([
  {
    id: 1,
    reviewer: 'Jane Smith (Assessor)',
    date: 'October 28, 2023',
    comment: 'The business plan is well-structured, but financial projections need more detail. Please upload an updated version.',
  },
  {
    id: 2,
    reviewer: 'Robert Brown (Reviewer)',
    date: 'October 29, 2023',
    comment: 'The provided certificates are clear and valid. No issues found.',
  },
]);
</script>
