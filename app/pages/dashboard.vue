<template>
  <NuxtLayout name="dashboard">
    <NuxtPage />
  </NuxtLayout>
</template>
<script setup lang="ts">
// Parent route for all /dashboard pages
// Also you can enforce auth middleware here for the whole dashboard
definePageMeta({
  middleware: 'auth'
})
</script>
