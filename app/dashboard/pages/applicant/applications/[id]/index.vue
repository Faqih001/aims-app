<script setup lang="ts">
import { ref } from 'vue'
const route = useRoute()

const application = ref({
  id: route.params.id,
  title: 'ISO 9001 Reactivation',
  status: 'Under Assessment',
  progress: 60,
  submittedAt: '2026-02-10'
})

const steps = [
  { title: 'Draft Submitted', description: 'Application received', active: true, done: true },
  { title: 'Pre-Screening', description: 'Documents checked', active: true, done: true },
  { title: 'Assessment', description: 'Assessor analyzing context', active: true, done: false },
  { title: 'Final Review', description: 'Pending reviewer decision', active: false, done: false },
]
</script>

<template>
  <div class="space-y-6">
    <DashboardBreadcrumb :breadcrumbs="[{label: 'Applicant', to: '/dashboard/applicant'}, {label: 'Applications', to: '/dashboard/applicant/applications'}, {label: `Details (${application.id})`}]" />
    
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold">{{ application.title }}</h1>
        <p class="text-sm text-gray-500 mt-1">Submitted on {{ application.submittedAt }}</p>
      </div>
      <UBadge color="blue" size="lg">{{ application.status }}</UBadge>
    </div>

    <UCard>
      <template #header>
        <h3 class="font-semibold text-lg">Timeline Tracker</h3>
      </template>
      <UProgress :value="application.progress" color="primary" class="mb-8" />
      
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div v-for="(step, idx) in steps" :key="idx" :class="['p-4 border rounded-lg', step.active ? 'border-primary-500 bg-primary-50 dark:bg-primary-950/20' : 'border-gray-200 dark:border-gray-800']">
          <div class="flex items-center justify-between mb-2">
            <span class="font-semibold text-sm">{{ step.title }}</span>
            <UIcon v-if="step.done" name="i-heroicons-check-circle" class="text-green-500 w-5 h-5"/>
            <UIcon v-else-if="step.active" name="i-heroicons-arrow-path" class="text-primary-500 w-5 h-5 animate-spin-slow"/>
          </div>
          <p class="text-xs text-gray-600 dark:text-gray-400">{{ step.description }}</p>
        </div>
      </div>
    </UCard>
  </div>
</template>
