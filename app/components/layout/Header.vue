<script setup lang="ts">
const route = useRoute()
const colorMode = useColorMode()
const { locale, setLocale } = useI18n()

const openMobile = ref(false)

const navLinks = computed(() => [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Contact', to: '/contact' },
  { label: 'FAQs', to: '/faqs' }
])

const localeItems = [
  { label: 'EN', value: 'en' },
  { label: 'SW', value: 'sw' }
]

const selectedLocale = computed({
  get: () => locale.value,
  set: async (value: string) => {
    await setLocale(value)
  }
})

const isDark = computed(() => colorMode.value === 'dark')
function toggleTheme() {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}
</script>

<template>
  <header class="sticky top-0 z-40 border-b border-default/50 bg-white/80 dark:bg-[#1A1A1A]/85 backdrop-blur-xl">
    <UContainer class="max-w-7xl mx-auto">
      <div class="h-16 flex items-center justify-between gap-4">
        <NuxtLink to="/" class="flex items-center gap-2 font-extrabold text-[#003087] dark:text-primary-300">
          <UIcon name="i-heroicons-shield-check" class="size-7 text-[#00A651]" />
          <span>AIMS</span>
        </NuxtLink>

        <nav class="hidden lg:flex items-center gap-6">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            class="text-sm font-medium transition-colors hover:text-[#003087]"
            :class="route.path === link.to ? 'text-[#003087] dark:text-primary-300' : 'text-muted'"
          >
            {{ link.label }}
          </NuxtLink>
        </nav>

        <div class="hidden md:flex items-center gap-2">
          <USelect
            v-model="selectedLocale"
            :items="localeItems"
            size="sm"
            class="w-20"
          />
          <UButton
            :icon="isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'"
            color="neutral"
            variant="ghost"
            aria-label="Toggle color mode"
            @click="toggleTheme"
          />
          <UButton to="/auth/login" variant="ghost" color="primary">Login</UButton>
          <UButton to="/auth/register" color="primary" class="transition-transform duration-200 hover:scale-105">Register</UButton>
        </div>

        <UButton
          class="md:hidden"
          icon="i-heroicons-bars-3"
          color="neutral"
          variant="ghost"
          aria-label="Open menu"
          @click="openMobile = true"
        />
      </div>
    </UContainer>

    <UModal v-model:open="openMobile" title="Navigation">
      <template #body>
        <div class="space-y-3">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            class="block rounded-lg px-3 py-2 bg-elevated hover:bg-accented"
            @click="openMobile = false"
          >
            {{ link.label }}
          </NuxtLink>

          <div class="flex items-center gap-2 pt-2">
            <USelect v-model="selectedLocale" :items="localeItems" size="sm" class="w-24" />
            <UButton :icon="isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'" color="neutral" variant="ghost" @click="toggleTheme" />
          </div>

          <div class="grid grid-cols-2 gap-2 pt-2">
            <UButton to="/auth/login" variant="soft" color="primary" @click="openMobile = false">Login</UButton>
            <UButton to="/auth/register" color="primary" @click="openMobile = false">Register</UButton>
          </div>
        </div>
      </template>
    </UModal>
  </header>
</template>
