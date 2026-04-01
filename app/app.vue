<script setup lang="ts">
const route = useRoute();

const isDashboardPage = computed(() => route.path.startsWith('/dashboard'));

useHead({
  meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1' }],
  htmlAttrs: { lang: 'en' }
})

useSeoMeta({
  title: 'AIMS',
  description: 'Accreditation Information Management System'
})
</script>

<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <UNotifications />
    <Chatbot v-if="!isDashboardPage" />
  </div>
</template>
