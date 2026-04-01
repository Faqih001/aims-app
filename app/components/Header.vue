<script setup lang="ts">
const route = useRoute()
const colorMode = useColorMode()
const { locale, setLocale } = useI18n()
const authStore = useAuthStore()

type LocaleCode = 'en' | 'sw'

const openMobile = ref(false)

const getPrefix = () => {
  if (authStore.isAdmin) return '/dashboard/admin';
  if (authStore.isAssessor) return '/dashboard/assessor';
  if (authStore.isReviewer) return '/dashboard/reviewer';
  return '/dashboard/applicant';
};

const userInitials = computed(() => {
  const name = authStore.user?.name || 'US';
  return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
});

const userRole = computed(() => {
  return authStore.user?.role || 'User';
});

const dropdownItems = computed(() => [
  [{
    label: 'Dashboard',
    icon: 'i-heroicons-squares-2x2',
    to: getPrefix()
  }],
  [{
    label: 'Profile',
    icon: 'i-heroicons-user',
    to: `${getPrefix()}/profile`
  }],
  [{
    label: 'Settings',
    icon: 'i-heroicons-cog-8-tooth',
    to: `${getPrefix()}/settings`
  }],
  [{
    label: 'Logout',
    icon: 'i-heroicons-arrow-left-on-rectangle',
    click: () => authStore.logout()
  }]
]);

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
          <ClientOnly>
            <GoogleTranslate />
          </ClientOnly>
          <UButton
            :icon="isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'"
            color="neutral"
            variant="ghost"
            aria-label="Toggle color mode"
            @click="toggleTheme"
          />
          <template v-if="!authStore.isAuthenticated">
            <UButton to="/auth/login" variant="ghost" color="primary">Login</UButton>
            <UButton to="/auth/register" color="primary" class="transition-transform duration-200 hover:scale-105">Register</UButton>
          </template>
          <template v-else>
            <UDropdownMenu :items="dropdownItems" mode="hover" :content="{ align: 'end', class: 'w-48 sm:w-56' }" class="ml-2">
              <div class="w-full sm:w-56 flex items-center justify-between gap-2 cursor-pointer px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition">
                <div class="flex items-center gap-2">
                  <UAvatar :alt="userInitials" size="sm" />
                  <div class="flex flex-col text-left mr-1 md:mr-2 hidden sm:flex">
                    <span class="text-sm font-semibold text-gray-800 dark:text-gray-200 leading-tight">{{ authStore.user?.name || 'User' }}</span>
                    <span class="text-xs text-gray-500 dark:text-gray-400 capitalize">{{ userRole.toLowerCase().replace('_', ' ') }}</span>
                  </div>
                </div>
                <UIcon name="i-heroicons-chevron-down" class="h-4 w-4 text-gray-500 hidden sm:block" />
              </div>
            </UDropdownMenu>
          </template>
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

          <div class="flex items-center justify-between gap-2 pt-2">
            <ClientOnly>
              <GoogleTranslate />
            </ClientOnly>
            <UButton :icon="isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'" color="neutral" variant="ghost" @click="toggleTheme" />
          </div>

          <div class="grid grid-cols-2 gap-2 pt-2" v-if="!authStore.isAuthenticated">
            <UButton to="/auth/login" variant="soft" color="primary" @click="openMobile = false">Login</UButton>
            <UButton to="/auth/register" color="primary" @click="openMobile = false">Register</UButton>
          </div>
          <div class="flex flex-col gap-2 pt-2" v-else>
            <UDropdownMenu :items="dropdownItems" mode="click" :content="{ class: 'w-full' }" class="w-full">
              <div class="w-full flex items-center justify-between gap-2 cursor-pointer px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition">
                <div class="flex items-center gap-3">
                  <UAvatar :alt="userInitials" size="md" />
                  <div class="flex flex-col text-left">
                    <span class="text-sm font-semibold text-gray-800 dark:text-gray-200 leading-tight">{{ authStore.user?.name || 'User' }}</span>
                    <span class="text-xs text-gray-500 dark:text-gray-400 capitalize">{{ userRole.toLowerCase().replace('_', ' ') }}</span>
                  </div>
                </div>
                <UIcon name="i-heroicons-chevron-down" class="h-4 w-4 text-gray-500" />
              </div>
            </UDropdownMenu>
          </div>
        </div>
      </template>
    </UModal>
  </header>
</template>
