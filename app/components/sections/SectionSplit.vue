<script setup lang="ts">
defineProps<{
  title: string
  description: string
  imageUrl: string
  reverse?: boolean
}>()
</script>

<template>
  <section class="py-16 md:py-24">
    <UContainer class="max-w-7xl mx-auto">
      <div class="grid lg:grid-cols-2 gap-8 items-center" :class="{ 'lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1': reverse }">
        <div>
          <h2 class="text-3xl md:text-4xl font-bold text-[#003087] dark:text-primary-300">{{ title }}</h2>
          <p class="mt-4 text-muted leading-7">{{ description }}</p>
          <div class="mt-6 grid sm:grid-cols-2 gap-4">
            <UCard class="rounded-xl">
              <p class="text-sm font-semibold">Transparent Reviews</p>
              <p class="text-xs text-muted mt-1">Track every stage with timestamped updates.</p>
            </UCard>
            <UCard class="rounded-xl">
              <p class="text-sm font-semibold">Secure Data Handling</p>
              <p class="text-xs text-muted mt-1">Built with modern access and audit controls.</p>
            </UCard>
          </div>
        </div>

        <div class="relative rounded-2xl overflow-hidden shadow-xl min-h-[300px]">
          <img :src="imageUrl" :alt="title" class="absolute inset-0 w-full h-full object-cover" loading="lazy">
          <div class="absolute inset-0 bg-gradient-to-t from-[#003087]/70 to-transparent" />
        </div>
      </div>
    </UContainer>
  </section>
</template>
