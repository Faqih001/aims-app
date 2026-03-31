#!/bin/bash

# 1. Reviewer Applications Index
cat << 'VUE' > app/dashboard/pages/reviewer/applications/index.vue
<script setup lang="ts">
import { ref } from 'vue'

const columns = [
  { key: 'appId', label: 'Application ID' },
  { key: 'applicantName', label: 'Applicant Name' },
  { key: 'submissionDate', label: 'Submission Date' },
  { key: 'status', label: 'Status' },
  { key: 'priority', label: 'Priority' },
  { key: 'actions', label: 'Actions' }
]

const applications = ref([
  { id: 1, appId: 'APP-2026-001', applicantName: 'Tech Innovators Ltd', submissionDate: '2026-03-15', status: 'Pending Review', priority: 'High' },
  { id: 2, appId: 'APP-2026-042', applicantName: 'Global Services Co', submissionDate: '2026-03-20', status: 'In Progress', priority: 'Medium' }
])

const getBadgeColor = (status: string) => {
  if (status === 'Pending Review') return 'yellow'
  if (status === 'In Progress') return 'blue'
  return 'gray'
}
</script>

<template>
  <div class="space-y-6">
    <DashboardBreadcrumb :breadcrumbs="[{label: 'Reviewer', to: '/dashboard/reviewer'}, {label: 'Applications'}]" />
    <div class="flex justify-between items-center">
      <h1 class="text-3xl font-bold">Assigned Applications</h1>
      <UInput icon="i-heroicons-magnifying-glass" placeholder="Search applications..." />
    </div>

    <UCard>
      <UTable :columns="columns" :rows="applications">
        <template #status-data="{ row }">
          <UBadge :color="getBadgeColor(row.status)" variant="subtle">{{ row.status }}</UBadge>
        </template>
        <template #priority-data="{ row }">
          <div class="flex items-center gap-2">
            <UIcon name="i-heroicons-flag" :class="row.priority === 'High' ? 'text-red-500' : 'text-orange-500'" />
            <span class="text-sm">{{ row.priority }}</span>
          </div>
        </template>
        <template #actions-data="{ row }">
          <UButton size="xs" :to="`/dashboard/reviewer/applications/${row.id}`" color="primary" variant="soft">View Details</UButton>
        </template>
      </UTable>
    </UCard>
  </div>
</template>
VUE

# 2. Reviewer Application Details
cat << 'VUE' > app/dashboard/pages/reviewer/applications/[id]/index.vue
<script setup lang="ts">
import { ref } from 'vue'
const route = useRoute()

const appDetails = ref({
  id: route.params.id,
  code: 'APP-2026-001',
  applicantName: 'Tech Innovators Ltd',
  submissionDate: '2026-03-15',
  status: 'Pending Review',
  assignedAssessor: 'John Doe',
  summary: 'Seeking initial ISO 27001 accreditation. All pre-requisite documents have been verified by the automated system.'
})

const decision = ref('')
const feedback = ref('')
</script>

<template>
  <div class="space-y-6">
    <DashboardBreadcrumb :breadcrumbs="[{label: 'Reviewer', to: '/dashboard/reviewer'}, {label: 'Applications', to: '/dashboard/reviewer/applications'}, {label: appDetails.code}]" />
    
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold flex items-center gap-3">
          {{ appDetails.code }} 
          <UBadge color="yellow">{{ appDetails.status }}</UBadge>
        </h1>
        <p class="text-gray-500 mt-1">{{ appDetails.applicantName }}</p>
      </div>
      <UButton icon="i-heroicons-arrow-down-tray" color="neutral" variant="ghost">Download Dossier</UButton>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div class="space-y-6 lg:col-span-2">
        <UCard>
          <template #header>
            <h3 class="font-semibold text-lg">Application Summary</h3>
          </template>
          <p class="text-gray-700 dark:text-gray-300 leading-relaxed">{{ appDetails.summary }}</p>
          
          <UDivider class="my-6" />
          
          <h4 class="font-medium mb-4">Provided Documents</h4>
          <ul class="space-y-3">
            <li class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
              <div class="flex items-center gap-3">
                <UIcon name="i-heroicons-document-check" class="text-green-500 w-5 h-5"/>
                <span>Corporate Structure.pdf</span>
              </div>
              <UButton size="xs" variant="link">View</UButton>
            </li>
            <li class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
              <div class="flex items-center gap-3">
                <UIcon name="i-heroicons-document-check" class="text-green-500 w-5 h-5"/>
                <span>Security Policies V2.docx</span>
              </div>
              <UButton size="xs" variant="link">View</UButton>
            </li>
          </ul>
        </UCard>
      </div>

      <div>
        <UCard>
          <template #header>
            <h3 class="font-semibold text-lg flex items-center gap-2">
              <UIcon name="i-heroicons-check-badge" />
              Reviewer Decision
            </h3>
          </template>
          
          <div class="space-y-4">
            <UFormGroup label="Final Decision">
              <USelect v-model="decision" :options="['Approve', 'Reject', 'Request Changes']" placeholder="Select..." />
            </UFormGroup>
            
            <UFormGroup label="Internal Feedback (Optional)">
              <UTextarea v-model="feedback" rows="4" placeholder="Notes for the admins..." />
            </UFormGroup>

            <UButton block color="primary" class="mt-4">Submit Review</UButton>
          </div>
        </UCard>
      </div>
    </div>
  </div>
</template>
VUE

# 3. Applicant Application Details (Deep View)
cat << 'VUE' > app/dashboard/pages/applicant/applications/[id]/index.vue
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
VUE

# 4. Reviewer Audits
cat << 'VUE' > app/dashboard/pages/reviewer/audits/index.vue
<script setup lang="ts">
import { ref } from 'vue'

const audits = ref([
  { id: 'AUD-01', entity: 'Beta Corp', type: 'Surveillance', date: '2026-01-10', result: 'Pass' },
  { id: 'AUD-02', entity: 'Delta Systems', type: 'Initial', date: '2026-02-22', result: 'Conditional Pass' }
])
</script>

<template>
  <div class="space-y-6">
    <DashboardBreadcrumb :breadcrumbs="[{label: 'Reviewer', to: '/dashboard/reviewer'}, {label: 'Audits'}]" />
    <h1 class="text-3xl font-bold flex items-center gap-3">
      Audit Ledgers
      <UIcon name="i-heroicons-clipboard-document-list" class="w-8 h-8 text-primary" />
    </h1>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <UCard>
        <p class="text-sm font-medium text-gray-500">Total Audits</p>
        <p class="text-3xl font-bold mt-2">124</p>
      </UCard>
      <UCard>
        <p class="text-sm font-medium text-gray-500">Passed This Year</p>
        <p class="text-3xl font-bold mt-2 text-green-600">89</p>
      </UCard>
      <UCard>
        <p class="text-sm font-medium text-gray-500">Pending Follow-ups</p>
        <p class="text-3xl font-bold mt-2 text-orange-500">14</p>
      </UCard>
    </div>

    <UCard>
      <UTable :rows="audits">
        <template #result-data="{ row }">
          <UBadge :color="row.result === 'Pass' ? 'green' : 'yellow'" variant="soft">{{ row.result }}</UBadge>
        </template>
      </UTable>
    </UCard>
  </div>
</template>
VUE

