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
        <aside class="lg:col-span-3 lg:sticky lg:top-28 self-start max-h-[70vh] overflow-auto rounded-xl border border-default p-4 bg-white dark:bg-[#111]">
          <h2 class="font-semibold mb-3">Table of Contents</h2>
          <ul class="space-y-2 text-sm">
            <li v-for="item in toc" :key="item.id">
              <a :href="`#${item.id}`" class="text-muted hover:text-[#003087]">{{ item.label }}</a>
            </li>
          </ul>
        </aside>

        <article class="lg:col-span-9 rounded-xl border border-default bg-white dark:bg-[#111] p-6 md:p-8">
          <header class="mb-8 pb-6 border-b border-default/60">
            <h1 class="text-3xl md:text-4xl font-bold text-[#003087] dark:text-primary-300">{{ title }}</h1>
            <p class="text-sm text-muted mt-2">Last updated: {{ updatedAt }}</p>
          </header>

          <div class="space-y-8 max-h-[70vh] overflow-auto pr-2">
            <section v-for="item in sections" :id="item.id" :key="item.id" class="scroll-mt-32">
              <h2 class="text-xl font-semibold mb-2">{{ item.heading }}</h2>
              <p class="text-sm leading-7 text-muted">{{ item.body }}</p>
            </section>
          </div>
        </article>
      </div>
    </UContainer>
  </section>
</template>
