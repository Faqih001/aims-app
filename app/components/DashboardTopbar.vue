<script setup lang="ts">
const colorMode = useColorMode()
const { locale, setLocale } = useI18n()

const isDark = computed(() => colorMode.value === 'dark')

function toggleTheme() {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}

const localeItems = [
  { label: 'EN', value: 'en' },
  { label: 'SW', value: 'sw' }
]

const selectedLocale = computed({
  get: () => locale.value,
  set: (value) => setLocale(value)
})
</script>

<template>
  <header class="flex items-center justify-between px-6 py-5 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
    <div class="flex items-center">
      <UInput icon="i-heroicons-magnifying-glass" placeholder="Search..." />
    </div>
    <div class="flex items-center">
      <UButton icon="i-heroicons-bell" variant="ghost" color="primary" />
      <USelect v-model="selectedLocale" :items="localeItems" class="w-20 mx-4" />
      <UButton
        :icon="isDark ? 'i-heroicons-moon' : 'i-heroicons-sun'"
        variant="ghost"
        color="primary"
        @click="toggleTheme"
      />
      <UDropdown :items="[]">
        <UButton color="neutral" label="User" trailing-icon="i-heroicons-chevron-down" />
      </UDropdown>
    </div>
  </header>
</template>
