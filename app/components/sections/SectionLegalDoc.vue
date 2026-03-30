<script setup lang="ts">
interface TocItem {
  id: string
  label: string
}
interface ContentItem {
  id: string
  heading: string
  body: string
}

defineProps<{
  title: string
  updatedAt: string
  toc: TocItem[]
  sections: ContentItem[]
}>()
</script>

<template>
  <section class="py-12 md:py-16">
    <UContainer class="max-w-7xl mx-auto">
      <div class="grid lg:grid-cols-12 gap-8">
        <aside class="lg:col-span-3 lg:sticky lg:top-28 self-start max-h-[70vh] overflow-auto rounded-2xl border border-default p-4 bg-white/90 dark:bg-[#111]/90 backdrop-blur shadow-lg">
          <h2 class="font-semibold mb-3">Table of Contents</h2>
          <ul class="space-y-2 text-sm">
            <li v-for="item in toc" :key="item.id">
              <a :href="`#${item.id}`" class="block rounded-lg px-2 py-1 text-muted hover:text-[#003087] hover:bg-primary-50 dark:hover:bg-primary-900/20">{{ item.label }}</a>
            </li>
          </ul>
        </aside>

        <article class="lg:col-span-9 rounded-2xl border border-default bg-white dark:bg-[#111] p-6 md:p-8 shadow-lg">
          <header class="mb-8 rounded-2xl p-6 md:p-8 bg-gradient-to-br from-[#003087] via-[#11439b] to-[#00A651] text-white">
            <h1 class="text-3xl md:text-4xl font-bold">{{ title }}</h1>
            <p class="text-sm text-white/90 mt-2">Last updated: {{ updatedAt }}</p>
          </header>

          <div class="space-y-4 max-h-[70vh] overflow-auto pr-2">
            <UCard
              v-for="(item, index) in sections"
              :id="item.id"
              :key="item.id"
              class="scroll-mt-32 rounded-xl border border-default/80 shadow-sm hover:shadow-md transition-shadow"
            >
              <template #header>
                <div class="flex items-center gap-3">
                  <span class="size-8 rounded-full bg-primary-50 dark:bg-primary-900/30 text-[#003087] dark:text-primary-300 text-xs font-semibold grid place-items-center">
                    {{ index + 1 }}
                  </span>
                  <h2 class="text-xl font-semibold">{{ item.heading }}</h2>
                </div>
              </template>

              <p class="text-sm leading-7 text-muted">{{ item.body }}</p>
            </UCard>
          </div>
        </article>
      </div>
    </UContainer>
  </section>
</template>
