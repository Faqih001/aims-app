<script setup lang="ts">
const route = useRoute()
const breadcrumbs = computed(() => {
  const pathArray = route.path.split('/').filter(i => i)
  const crumbs = pathArray.map((path, i) => {
    const to = '/' + pathArray.slice(0, i + 1).join('/')
    return { label: path.charAt(0).toUpperCase() + path.slice(1), to }
  })
  return [{ label: 'Dashboard', to: '/dashboard' }, ...crumbs]
})
</script>

<template>
  <nav class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">
    <ol class="list-none p-0 inline-flex">
      <li v-for="(crumb, index) in breadcrumbs" :key="index" class="flex items-center">
        <NuxtLink :to="crumb.to" class="hover:text-gray-700 dark:hover:text-gray-200">{{ crumb.label }}</NuxtLink>
        <UIcon v-if="index < breadcrumbs.length - 1" name="i-heroicons-chevron-right" class="h-4 w-4 mx-2" />
      </li>
    </ol>
  </nav>
</template>
