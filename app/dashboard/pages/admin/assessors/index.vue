<script setup lang="ts">
import { ref } from 'vue';

interface Assessor {
  id: string;
  name: string;
  email: string;
  activeAssignments: number;
}

const columns = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'activeAssignments', label: 'Active Assignments' },
  { key: 'actions', label: 'Actions' },
];

const assessors = ref<Assessor[]>([
  { id: 'ASR001', name: 'Jane Smith', email: 'jane.smith@example.com', activeAssignments: 3 },
  { id: 'ASR002', name: 'Peter Jones', email: 'peter.jones@example.com', activeAssignments: 5 },
]);

function viewProfile(assessor: Assessor) {
  console.log('Viewing profile for:', assessor);
}

function viewAssignments(assessor: Assessor) {
  console.log('Viewing assignments for:', assessor);
}
</script>

<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Manage Assessors</h1>
    <UTable :rows="assessors" :columns="columns">
      <template #actions-data="{ row }: { row: Assessor }">
        <UButton variant="ghost" @click="viewProfile(row)">View Profile</UButton>
        <UButton variant="ghost" @click="viewAssignments(row)">Assignments</UButton>
      </template>
    </UTable>
  </div>
</template>
