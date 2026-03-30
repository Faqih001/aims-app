<script setup lang="ts">
defineProps<{
  title: string
  description: string
  buttonLabel: string
  buttonTo: string
}>()
</script>

<template>
  <section class="py-16 md:py-24">
    <UContainer class="max-w-7xl mx-auto">
      <div class="rounded-3xl p-8 md:p-12 bg-gradient-to-r from-[#003087] via-[#19479a] to-[#00A651] text-white shadow-xl">
        <div class="max-w-3xl">
          <h2 class="text-3xl md:text-4xl font-bold">{{ title }}</h2>
          <p class="mt-4 text-white/90">{{ description }}</p>
          <UButton :to="buttonTo" color="neutral" size="xl" class="mt-6 text-[#003087] transition-transform duration-200 hover:scale-105">
            {{ buttonLabel }}
          </UButton>
        </div>
      </div>
    </UContainer>
  </section>
</template>
