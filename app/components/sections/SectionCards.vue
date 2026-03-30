<script setup lang="ts">
interface CardItem {
  title: string
  description: string
  icon?: string
  badge?: string
}

defineProps<{
  title: string
  subtitle?: string
  items: CardItem[]
  columns?: 2 | 3 | 4
}>()
</script>

<template>
  <section class="py-16 md:py-24">
    <UContainer class="max-w-7xl mx-auto">
      <div class="mb-10">
        <h2 class="text-3xl md:text-4xl font-bold text-[#003087] dark:text-primary-300">{{ title }}</h2>
        <p v-if="subtitle" class="mt-3 text-muted max-w-3xl">{{ subtitle }}</p>
      </div>

      <div
        class="grid gap-5"
        :class="{
          'md:grid-cols-2': columns === 2,
          'md:grid-cols-2 xl:grid-cols-3': columns === 3,
          'md:grid-cols-2 xl:grid-cols-4': columns === 4 || !columns
        }"
      >
        <UCard
          v-for="item in items"
          :key="item.title"
          class="rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
        >
          <template #header>
            <div class="flex items-start justify-between gap-3">
              <div class="flex items-center gap-2">
                <UIcon v-if="item.icon" :name="item.icon" class="size-5 text-[#00A651]" />
                <h3 class="font-semibold">{{ item.title }}</h3>
              </div>
              <UBadge v-if="item.badge" color="primary" variant="soft">{{ item.badge }}</UBadge>
            </div>
          </template>

          <p class="text-sm text-muted leading-6">{{ item.description }}</p>
        </UCard>
      </div>
    </UContainer>
  </section>
</template>
