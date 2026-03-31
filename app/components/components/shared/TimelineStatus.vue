<template>
  <ol class="flex items-center w-full">
    <li v-for="(step, idx) in steps" :key="step.status" class="flex w-full items-center text-sm font-medium after:content-[''] after:w-full after:h-1 after:border-b after:border-4 after:inline-block"
        :class="[currentIdx >= idx ? 'text-primary-600 after:border-primary-600' : 'text-gray-500 after:border-gray-200']">
      <span class="flex items-center justify-center w-8 h-8 rounded-full" :class="[currentIdx >= idx ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-500']">
        <UIcon v-if="currentIdx > idx" name="i-heroicons-check" class="w-5 h-5" />
        <span v-else>{{ idx + 1 }}</span>
      </span>
      <span class="ml-2 hidden sm:inline">{{ step.label }}</span>
    </li>
  </ol>
</template>
<script setup lang="ts">
import { computed } from 'vue';
const props = defineProps({ status: String });
const steps = [
  { status: 'DRAFT', label: 'Draft' },
  { status: 'SUBMITTED', label: 'Submitted' },
  { status: 'ASSESSING', label: 'Assessing' },
  { status: 'REVIEWED', label: 'Reviewed' },
  { status: 'ACCREDITED', label: 'Accredited' }
];
const currentIdx = computed(() => steps.findIndex(s => s.status === props.status));
</script>
