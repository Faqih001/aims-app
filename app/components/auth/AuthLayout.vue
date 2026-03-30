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
  <div class="min-h-screen flex flex-col lg:flex-row" :class="{ 'lg:flex-row-reverse': reverse }">
    <div
      class="hidden lg:block relative lg:h-auto lg:w-3/5 border-primary-900"
      :class="{ 'lg:border-r-4': !reverse, 'lg:border-l-4': reverse }"
    >
      <slot name="image" />
    </div>

    <div class="w-full lg:w-2/5 flex items-center justify-center min-h-screen lg:min-h-0 p-6 sm:p-12 xl:p-24 bg-gray-50 dark:bg-gray-900 border-t-4 border-primary-900 lg:border-t-0 relative">
        <div class="w-full flex flex-col">
          <div class="w-full max-w-md mx-auto flex items-center justify-between mb-3 z-20">
            <div class="flex items-center">
              <AppLogo class="h-9 w-auto" />
            </div>

            <div class="flex items-center gap-2">
              <NuxtLink to="/">
                <UButton icon="i-heroicons-home-20-solid" color="neutral" variant="ghost" aria-label="Home" size="sm" />
              </NuxtLink>

              <ClientOnly>
                <UButton
                  :icon="isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'"
                  color="neutral"
                  variant="ghost"
                  aria-label="Theme toggle"
                  size="sm"
                  @click="toggleTheme"
                />
              </ClientOnly>
            </div>
          </div>

          <div class="w-full max-w-md mx-auto">
            <slot name="form" />
          </div>
        </div>
      </div>
  </div>
</template>
