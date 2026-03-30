<script setup lang="ts">
defineProps<{
  title: string
  subtitle: string
}>()
</script>

<template>
  <UCard class="rounded-xl shadow-lg border border-default/70">
    <template #header>
      <div>
        <h2 class="text-xl sm:text-2xl font-semibold text-highlighted">
          {{ title }}
        </h2>
        <p class="text-sm text-muted mt-1">
          {{ subtitle }}
        </p>
      </div>
    </template>

    <slot />

    <template #footer>
      <slot name="footer" />
    </template>
  </UCard>
</template>