<script setup lang="ts">
interface TimelineItem {
  title: string
  description: string
}

defineProps<{
  title: string
  items: TimelineItem[]
}>()
</script>

<template>
  <section class="py-16 md:py-24 bg-white dark:bg-[#111]">
    <UContainer class="max-w-7xl mx-auto">
      <h2 class="text-3xl md:text-4xl font-bold text-[#003087] dark:text-primary-300 mb-10">{{ title }}</h2>

      <div class="space-y-6">
        <div v-for="(item, idx) in items" :key="item.title" class="flex gap-4">
          <div class="flex flex-col items-center">
            <div class="size-8 rounded-full bg-[#003087] text-white text-xs grid place-items-center">{{ idx + 1 }}</div>
            <div v-if="idx < items.length - 1" class="w-px h-16 bg-[#003087]/25" />
          </div>

          <UCard class="flex-1 rounded-xl shadow-lg">
            <h3 class="font-semibold mb-2">{{ item.title }}</h3>
            <p class="text-sm text-muted">{{ item.description }}</p>
          </UCard>
        </div>
      </div>
    </UContainer>
  </section>
</template>
