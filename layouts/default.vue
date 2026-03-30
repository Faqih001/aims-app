<script setup lang="ts">
const colorMode = useColorMode()
const isDark = computed({
  get () {
    return colorMode.value === 'dark'
  },
  set () {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  }
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col">
    <header class="bg-primary-900 text-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div class="flex items-center space-x-4">
          <NuxtLink to="/" class="text-xl font-bold tracking-tight">KENAS | AIMS</NuxtLink>
        </div>
        <nav class="hidden md:flex space-x-6 items-center">
          <NuxtLink to="/" class="hover:text-primary-200 transition">Home</NuxtLink>
          <NuxtLink to="/services" class="hover:text-primary-200 transition">Services</NuxtLink>
          <NuxtLink to="/about" class="hover:text-primary-200 transition">About</NuxtLink>
          <ClientOnly>
            <UButton :icon="isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'"
              color="gray" variant="ghost" aria-label="Theme" @click="isDark = !isDark" />
          </ClientOnly>
          <UButton to="/login" color="white" variant="solid" class="font-semibold text-primary-900">Portal Login</UButton>
        </nav>
      </div>
    </header>

    <main class="flex-grow">
      <slot />
    </main>

    <footer class="bg-gray-900 text-gray-300 py-8 text-center">
      <p>&copy; {{ new Date().getFullYear() }} Accreditation Information Management System. All rights reserved.</p>
    </footer>
  </div>
</template>

<style scoped>
.bg-primary-900 {
  background-color: #003087;
}
.text-primary-900 {
  color: #003087;
}
.hover\:text-primary-200:hover {
  color: #bfdbfe;
}
</style>