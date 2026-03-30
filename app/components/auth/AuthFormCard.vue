<script setup lang="ts">
defineProps<{
  title: string
  subtitle: string
}>()
</script>

<template>
  <UCard class="rounded-xl shadow-lg border border-default/70">
    <template #header>
      <div class="flex items-center gap-3">
        <UAvatar
          icon="i-heroicons-shield-check"
          size="lg"
          class="bg-[#003087] text-white"
          alt="AIMS"
        />

        <div>
          <h2 class="text-xl sm:text-2xl font-semibold text-highlighted">
            {{ title }}
          </h2>
          <p class="text-sm text-muted mt-1">
            {{ subtitle }}
          </p>
        </div>
      </div>
    </template>

    <slot />

    <template #footer>
      <slot name="footer" />
    </template>
  </UCard>
</template>