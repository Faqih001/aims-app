<script setup lang="ts">
defineProps<{
  imageUrl?: string
}>()

const defaultImage = 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&q=80&w=2000'
</script>

<template>
  <div class="absolute inset-0">
    <div class="absolute inset-0 bg-cover bg-center" :style="{ backgroundImage: `url(${imageUrl || defaultImage})` }"></div>
    <!-- Overlay -->
    <div class="absolute inset-0 bg-primary-900/85 dark:bg-gray-950/90 mix-blend-multiply transition-colors duration-300"></div>
    
    <!-- Content -->
    <div class="relative h-full flex flex-col justify-center p-12 lg:p-24 text-white">
      <div class="mb-8">
        <!-- Logo placeholder -->
        <div class="flex items-center space-x-3 mb-6">
          <UIcon name="i-heroicons-shield-check" class="w-12 h-12 text-[#00A651]" />
          <span class="text-3xl font-bold tracking-tight">KENAS</span>
        </div>
        <h1 class="text-4xl lg:text-5xl font-extrabold mb-4 leading-tight">
          Accreditation Information<br/>Management System
        </h1>
        <p class="text-lg text-primary-100 max-w-xl">
          A secure, government-grade platform for managing the entire accreditation lifecycle with ease, transparency, and efficiency.
        </p>
      </div>
      
      <div class="glass-card mt-8 max-w-md">
        <ul class="space-y-4 text-sm font-medium">
          <li class="flex items-center space-x-3">
            <UIcon name="i-heroicons-check-circle" class="w-6 h-6 text-[#00A651]" />
            <span>Secure Role-Based Access Control</span>
          </li>
          <li class="flex items-center space-x-3">
            <UIcon name="i-heroicons-document-check" class="w-6 h-6 text-[#00A651]" />
            <span>Digital Application & Assessment Flow</span>
          </li>
          <li class="flex items-center space-x-3">
            <UIcon name="i-heroicons-arrow-path-rounded-square" class="w-6 h-6 text-[#00A651]" />
            <span>Real-time Status Tracking & Notifications</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.glass-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 1rem;
  padding: 1.5rem;
}
.text-\[\#00A651\] {
  color: #00A651;
}
</style>