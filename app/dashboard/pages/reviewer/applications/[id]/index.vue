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
