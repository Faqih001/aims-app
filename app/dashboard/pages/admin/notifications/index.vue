<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Notifications</h1>
    <div class="space-y-4">
      <UCard v-for="notification in formattedNotifications" :key="notification.id">
        <div class="flex justify-between items-start">
          <div>
            <p :class="['font-semibold', notification.read ? 'font-normal text-gray-600' : '']">{{ notification.message }}</p>
            <p class="text-sm text-gray-500">{{ notification.time }}</p>
          </div>
          <UButton v-if="!notification.read" variant="ghost" @click="markAsRead(notification)">Mark as read</UButton>
        </div>
      </UCard>
    </div>
    <UButton v-if="formattedNotifications.some(n => !n.read)" @click="markAllAsRead" class="mt-4">Mark all as read</UButton>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

const { data: notifications, pending, error, refresh } = await useFetch('/api/admin/notifications');

async function markAsRead(notification: any) {
  await $fetch(`/api/admin/notifications/${notification.id}`, { method: 'PUT' });
  refresh();
}

async function markAllAsRead() {
  await $fetch('/api/admin/notifications/read-all', { method: 'PUT' });
  refresh();
}

const formattedNotifications = computed(() => {
  if (!notifications.value) return [];
  return notifications.value.map(n => ({
    ...n,
    time: dayjs(n.time).fromNow(),
    read: n.read === 'true',
  }));
});
</script>
