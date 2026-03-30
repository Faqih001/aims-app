<script setup lang="ts">
interface FAQItem {
  label: string
  content: string
}

defineProps<{
  title: string
  items: FAQItem[]
}>()
</script>

<template>
  <section class="py-16 md:py-24 bg-white dark:bg-[#111]">
    <UContainer class="max-w-5xl mx-auto">
      <h2 class="text-3xl md:text-4xl font-bold text-[#003087] dark:text-primary-300 mb-8">{{ title }}</h2>
      <UAccordion :items="items" :ui="{ item: 'rounded-xl border border-default mb-3 bg-default' }" />
    </UContainer>
  </section>
</template>
