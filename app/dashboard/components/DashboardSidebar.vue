<script setup lang="ts">
import { ref } from 'vue'

const isCollapsed = ref(false)
</script>

<template>
  <div
    class="flex flex-col justify-between h-full bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 transition-all duration-300"
    :class="isCollapsed ? 'w-20' : 'w-64'"
  >
    <div>
      <div class="flex items-center justify-center h-20 border-b border-gray-200 dark:border-gray-700">
        <AppLogo :class="{ 'hidden': isCollapsed }" />
      </div>
      <nav class="mt-4">
        <NuxtLink
          to="/dashboard"
          class="flex items-center px-6 py-3 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <UIcon name="i-heroicons-home" class="h-6 w-6" />
          <span class="mx-4" :class="{ 'hidden': isCollapsed }">Dashboard</span>
        </NuxtLink>
      </nav>
    </div>
    <div class="px-6 py-4">
      <button
        class="w-full flex items-center justify-center p-2 rounded-md bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
        @click="isCollapsed = !isCollapsed"
      >
        <UIcon :name="isCollapsed ? 'i-heroicons-chevron-right' : 'i-heroicons-chevron-left'" class="h-6 w-6" />
      </button>
    </div>
  </div>
</template>
