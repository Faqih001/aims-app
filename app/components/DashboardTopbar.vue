<script setup lang="ts">
const colorMode = useColorMode()
const { locale, setLocale } = useI18n()
const authStore = useAuthStore()
const router = useRouter()
const sidebarStore = useSidebarStore()

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
    label: 'Home',
    icon: 'i-heroicons-home',
    to: '/'
  }],
  [{
    label: 'Profile',
    icon: 'i-heroicons-user',
    click: () => router.push(`${getPrefix()}/profile`)
  }],
  [{
    label: 'Settings',
    icon: 'i-heroicons-cog-8-tooth',
    click: () => router.push(`${getPrefix()}/settings`)
  }],
  [{
    label: 'Logout',
    icon: 'i-heroicons-arrow-left-on-rectangle',
    click: () => authStore.logout()
  }]
]);
</script>

<template>
  <header class="flex items-center justify-between px-4 md:px-6 h-20 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
    <div class="flex items-center gap-4">
      <UButton 
        icon="i-heroicons-bars-3" 
        color="primary" 
        variant="ghost" 
        class="md:hidden" 
        @click="sidebarStore.toggleMobile()" 
      />
      <UInput 
        icon="i-heroicons-magnifying-glass" 
        placeholder="Search..." 
        class="hidden lg:flex"
      />
    </div>
    <div class="flex items-center">
      <UButton icon="i-heroicons-bell" variant="ghost" color="primary" />
      <USelect v-model="selectedLocale" :items="localeItems" class="w-20 mx-2 md:mx-4" />
      <UButton
        :icon="isDark ? 'i-heroicons-moon' : 'i-heroicons-sun'"
        variant="ghost"
        color="primary"
        @click="toggleTheme"
        class="hidden sm:flex"
      />
      <UDropdownMenu :items="dropdownItems" mode="hover" :content="{ align: 'end', class: 'w-48 sm:w-56' }" class="ml-2 md:ml-4">
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
    </div>
  </header>
</template>