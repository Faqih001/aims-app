<script setup lang="ts">
const route = useRoute()
const applicationId = route.params.id

const { data: application, pending, error } = await useFetch(`/api/applications/${applicationId}`)

const tabs = [
  { label: 'Details', key: 'details' },
  { label: 'Documents', key: 'documents' },
  { label: 'Assessment', key: 'assessment' },
]

</script>
<template>
  <div>
    <div v-if="pending">Loading...</div>
    <div v-else-if="error">Error: {{ error.message }}</div>
    <div v-else-if="application">
      <h1 class="text-3xl font-bold mb-4">Application: {{ application.id }}</h1>

      <UTabs :items="tabs">
        <template #details>
          <UCard>
            <template #header>
              <h2 class="text-xl font-semibold">Application Details</h2>
            </template>
            <div class="space-y-4">
              <p><strong>Applicant:</strong> {{ application.applicant.name }}</p>
              <p><strong>Organization:</strong> {{ application.organization.name }}</p>
              <p><strong>Scope:</strong> {{ application.scope }}</p>
              <p><strong>Status:</strong> <UBadge :label="application.status" /></p>
            </div>
          </UCard>
        </template>
        <template #documents>
          <UCard>
            <template #header>
              <h2 class="text-xl font-semibold">Documents</h2>
            </template>
            <!-- Document list will go here -->
          </UCard>
        </template>
        <template #assessment>
          <AssessmentForm />
        </template>
      </UTabs>
    </div>
  </div>
</template>
