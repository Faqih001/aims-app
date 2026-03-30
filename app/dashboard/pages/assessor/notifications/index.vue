<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">My Notifications</h1>
    <div class="space-y-4">
      <UCard v-for="notification in notifications" :key="notification.id">
        <div class="flex justify-between items-start">
          <div>
            <p :class="['font-semibold', notification.read ? 'font-normal text-gray-600' : '']">{{ notification.message }}</p>
            <p class="text-sm text-gray-500">{{ notification.time }}</p>
          </div>
          <UButton v-if="!notification.read" variant="ghost" @click="markAsRead(notification)">Mark as read</UButton>
        </div>
      </UCard>
    </div>
    <UButton v-if="notifications.some(n => !n.read)" @click="markAllAsRead" class="mt-4">Mark all as read</UButton>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const notifications = ref([
  { id: 1, message: 'You have been assigned a new application: #54321.', time: '3 hours ago', read: false },
  { id: 2, message: 'Feedback submitted for application #12345.', time: '1 day ago', read: true },
  { id: 3, message: 'An audit has been scheduled for Nov 10.', time: '2 days ago', read: true },
]);

function markAsRead(notification: any) {
  notification.read = true;
}

function markAllAsRead() {
  notifications.value.forEach(n => n.read = true);
}
</script>
