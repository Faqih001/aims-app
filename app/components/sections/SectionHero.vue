<script setup lang="ts">
defineProps<{
  eyebrow?: string
  title: string
  description: string
  imageUrl: string
  primaryLabel?: string
  primaryTo?: string
  secondaryLabel?: string
  secondaryTo?: string
}>()
</script>

<template>
  <section class="relative overflow-hidden min-h-[70vh] md:min-h-[78vh] text-white">
    <div class="absolute inset-0 bg-cover bg-center" :style="{ backgroundImage: `url(${imageUrl})` }" />
    <div class="absolute inset-0 bg-gradient-to-br from-[#003087]/90 via-[#003087]/70 to-[#00A651]/55" />

    <UContainer class="relative max-w-7xl mx-auto py-24 md:py-32">
      <div class="max-w-3xl">
        <UBadge v-if="eyebrow" color="success" variant="soft" class="mb-4">{{ eyebrow }}</UBadge>
        <h1 class="text-4xl md:text-6xl font-extrabold leading-tight">{{ title }}</h1>
        <p class="mt-6 text-lg md:text-xl text-white/90 leading-8">{{ description }}</p>

        <div class="mt-8 flex flex-wrap gap-3">
          <UButton v-if="primaryLabel" :to="primaryTo" color="primary" size="xl" class="shadow-lg transition-transform duration-200 hover:scale-105">
            {{ primaryLabel }}
          </UButton>
          <UButton v-if="secondaryLabel" :to="secondaryTo" variant="outline" color="neutral" size="xl" class="bg-white/10 border-white/30 text-white">
            {{ secondaryLabel }}
          </UButton>
        </div>
      </div>
    </UContainer>
  </section>
</template>
