<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">User Profile</h1>
    <UCard v-if="user">
      <template #header>
        <h2 class="text-xl font-semibold">{{ user.name }}</h2>
        <p class="text-gray-500">{{ user.email }}</p>
      </template>

      <div class="space-y-4">
        <div>
          <h3 class="font-semibold">Role</h3>
          <p>{{ user.role }}</p>
        </div>
      </div>

      <template #footer>
        <UButton @click="editProfile" label="Edit Profile" />
      </template>
    </UCard>
    <div v-else>
      <p>Loading user data...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '../../../stores/auth';

const authStore = useAuthStore();
const user = authStore.user;

function editProfile() {
  // Navigate to edit profile page
  console.log('Navigate to edit profile page');
}
</script>
