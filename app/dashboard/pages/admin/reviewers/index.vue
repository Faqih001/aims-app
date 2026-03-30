<script setup lang="ts">
import { ref } from 'vue';

interface Reviewer {
  id: string;
  name: string;
  email: string;
  completedReviews: number;
}

const columns = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'completedReviews', label: 'Completed Reviews' },
  { key: 'actions', label: 'Actions' },
];

const reviewers = ref<Reviewer[]>([
  { id: 'REV001', name: 'Robert Brown', email: 'robert.brown@example.com', completedReviews: 12 },
  { id: 'REV002', name: 'Emily White', email: 'emily.white@example.com', completedReviews: 8 },
]);

function viewProfile(reviewer: Reviewer) {
  console.log('Viewing profile for:', reviewer);
}

function viewReviews(reviewer: Reviewer) {
  console.log('Viewing reviews for:', reviewer);
}
</script>

<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Manage Reviewers</h1>
    <UTable :rows="reviewers" :columns="columns">
      <template #actions-data="{ row }: { row: Reviewer }">
        <UButton variant="ghost" @click="viewProfile(row)">View Profile</UButton>
        <UButton variant="ghost" @click="viewReviews(row)">Reviews</UButton>
      </template>
    </UTable>
  </div>
</template>
