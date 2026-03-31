<script setup lang="ts">
const route = useRoute()
const colorMode = useColorMode()
const { locale, setLocale } = useI18n()

type LocaleCode = 'en' | 'sw'

const openMobile = ref(false)

const navLinks = computed(() => [
  { label: 'About', to: '/about' },
  { label: 'Sectors', to: '/sectors' },
  { label: 'Services', to: '/services' },
  { label: 'Contact', to: '/contact' },
  { label: 'FAQs', to: '/faqs' }
])

const legalLinks = [
  { label: 'Privacy Policy', to: '/legal/privacy' },
  { label: 'Terms and Conditions', to: '/legal/terms' },
  { label: 'Cookie Policy', to: '/legal/cookies' },
  { label: 'Accessibility Statement', to: '/legal/accessibility' },
  { label: 'Data Protection Policy', to: '/legal/data-protection' }
]

const localeItems = [
  { label: 'EN', value: 'en' },
  { label: 'SW', value: 'sw' }
]

const selectedLocale = computed({
  get: () => locale.value as LocaleCode,
  set: async (value: LocaleCode) => {
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
      <div class="h-20 flex items-center justify-between gap-4">
        <NuxtLink to="/" class="flex items-center gap-2">
          <AppLogo class="h-8 w-auto" />
          <span class="sr-only">AIMS</span>
        </NuxtLink>

        <nav class="hidden xl:flex items-center gap-6">
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

        <div class="hidden xl:flex items-center gap-2">
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
          class="xl:hidden"
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
          <p class="text-xs uppercase tracking-wide text-muted">Main Pages</p>
          <NuxtLink
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            class="block rounded-lg px-3 py-2 bg-elevated hover:bg-accented"
            @click="openMobile = false"
          >
            {{ link.label }}
          </NuxtLink>

          <p class="text-xs uppercase tracking-wide text-muted pt-2">Legal Pages</p>
          <NuxtLink
            v-for="link in legalLinks"
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
