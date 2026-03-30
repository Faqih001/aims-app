<script setup lang="ts">
const authStore = useAuthStore();
const { data: notifications, pending, error, refresh } = useFetch(`/api/users/${authStore.user?.id}/notifications`);

async function markAsRead(notification: any) {
  await $fetch(`/api/notifications/${notification.id}`, {
    method: 'PUT',
    body: { read: true },
  });
  refresh();
}

async function markAllAsRead() {
  const unreadIds = notifications.value?.filter(n => !n.read).map(n => n.id);
  if (!unreadIds || unreadIds.length === 0) return;

  await $fetch(`/api/notifications/mark-all-read`, {
    method: 'PUT',
    body: { ids: unreadIds },
  });
  refresh();
}
</script>

<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">My Notifications</h1>
    <div v-if="pending">
      <p>Loading notifications...</p>
    </div>
    <div v-else-if="error">
      <p>Error loading notifications.</p>
    </div>
    <div class="space-y-4" v-else>
      <UCard v-for="notification in notifications" :key="notification.id">
        <div class="flex justify-between items-start">
          <div>
            <p :class="['font-semibold', notification.isRead ? 'font-normal text-gray-600' : '']">{{ notification.message }}</p>
            <p class="text-sm text-gray-500">{{ new Date(notification.createdAt).toLocaleString() }}</p>
          </div>
          <UButton v-if="!notification.isRead" variant="ghost" @click="markAsRead(notification)">Mark as read</UButton>
        </div>
      </UCard>
    </div>
    <UButton v-if="notifications?.some(n => !n.isRead)" @click="markAllAsRead" class="mt-4">Mark all as read</UButton>
  </div>
</template>
