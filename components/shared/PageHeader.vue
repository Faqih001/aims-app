<template>
  <div class="mb-6 flex items-center justify-between">
    <div>
      <UBreadcrumb :links="breadcrumbs" class="mb-2" />
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">{{ title }}</h1>
    </div>
    <div v-if="actionLabel">
      <UButton :label="actionLabel" @click="$emit('action')" color="primary" icon="i-heroicons-plus" />
    </div>
  </div>
</template>
<script setup lang="ts">
defineProps({ title: String, breadcrumbs: Array, actionLabel: String });
defineEmits(['action']);
</script>
