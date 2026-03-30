<script setup lang="ts">
const colorMode = useColorMode()

const isDark = computed(() => colorMode.value === 'dark')

function toggleTheme() {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}

defineProps<{
  reverse?: boolean
}>()
</script>

<template>
  <div class="min-h-screen flex flex-col md:flex-row" :class="{ 'md:flex-row-reverse': reverse }">
    <div
      class="relative h-56 sm:h-64 md:h-auto md:w-1/2 lg:w-3/5 border-primary-900"
      :class="{ 'md:border-r-4': !reverse, 'md:border-l-4': reverse }"
    >
      <slot name="image" />
    </div>

    <div class="w-full md:w-1/2 lg:w-2/5 flex items-center justify-center p-6 sm:p-12 xl:p-24 bg-gray-50 dark:bg-gray-900 border-t-4 border-primary-900 md:border-t-0 relative">
      <div class="absolute top-4 right-4">
        <ClientOnly>
          <UButton
            :icon="isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'"
            color="neutral"
            variant="ghost"
            aria-label="Theme toggle"
            @click="toggleTheme"
          />
        </ClientOnly>
      </div>
      <div class="w-full max-w-md">
        <slot name="form" />
      </div>
    </div>
  </div>
</template>
