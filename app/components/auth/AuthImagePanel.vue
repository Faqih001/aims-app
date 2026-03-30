<script setup lang="ts">
defineProps<{
  imageUrl?: string
}>()

const defaultImage = 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&q=80&w=2000'
</script>

<template>
  <div class="absolute inset-0">
    <div class="absolute inset-0 bg-cover bg-center" :style="{ backgroundImage: `url(${imageUrl || defaultImage})` }" />
    <div class="absolute inset-0 bg-[#003087]/85 dark:bg-black/80 transition-colors duration-300" />

    <div class="relative h-full flex flex-col justify-center p-8 md:p-12 lg:p-20 text-white">
      <div class="mb-4 md:mb-8">
        <h1 class="text-2xl md:text-4xl lg:text-5xl font-extrabold mb-3 md:mb-4 leading-tight">
          Accreditation Information<br>
          Management System
        </h1>
        <p class="text-sm md:text-base lg:text-lg text-primary-100 max-w-xl">
          A secure, government-grade platform for managing the accreditation lifecycle with transparency and operational efficiency.
        </p>
      </div>

      <div class="glass-card mt-4 md:mt-8 max-w-md hidden sm:block">
        <ul class="space-y-3 md:space-y-4 text-sm font-medium">
          <li class="flex items-center space-x-3">
            <UIcon name="i-heroicons-check-circle" class="w-5 h-5 md:w-6 md:h-6 text-[#00A651]" />
            <span>Secure Role-Based Access Control</span>
          </li>
          <li class="flex items-center space-x-3">
            <UIcon name="i-heroicons-document-check" class="w-5 h-5 md:w-6 md:h-6 text-[#00A651]" />
            <span>Digital Application and Assessment Workflow</span>
          </li>
          <li class="flex items-center space-x-3">
            <UIcon name="i-heroicons-bell-alert" class="w-5 h-5 md:w-6 md:h-6 text-[#00A651]" />
            <span>Real-time Notifications and Status Tracking</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.glass-card {
  background: rgb(255 255 255 / 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgb(255 255 255 / 0.22);
  border-radius: 1rem;
  padding: 1rem;
}
</style>
