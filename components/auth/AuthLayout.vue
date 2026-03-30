<script setup lang="ts">
defineProps<{
  reverse?: boolean
}>()
</script>

<template>
  <div class="min-h-screen flex flex-col md:flex-row" :class="{ 'md:flex-row-reverse': reverse }">
    <!-- Image Panel -->
    <div class="relative hidden md:block w-full md:w-1/2 lg:w-3/5 border-primary-900" :class="{ 'border-r-4': !reverse, 'border-l-4': reverse }">
      <slot name="image" />
    </div>
    
    <!-- Form Panel -->
    <div class="w-full md:w-1/2 lg:w-2/5 flex items-center justify-center p-6 sm:p-12 xl:p-24 bg-gray-50 dark:bg-gray-900 border-t-4 border-primary-900 md:border-t-0 relative">
      <div class="absolute top-4 right-4">
        <ClientOnly>
          <UButton 
            :icon="useColorMode().value === 'dark' ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'"
            color="gray" variant="ghost" aria-label="Theme toggle" 
            @click="useColorMode().preference = useColorMode().value === 'dark' ? 'light' : 'dark'" 
          />
        </ClientOnly>
      </div>
      <div class="w-full max-w-md">
        <slot name="form" />
      </div>
    </div>
  </div>
</template>