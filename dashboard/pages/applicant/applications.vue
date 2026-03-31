<template>
  <div>
    <PageHeader title="Application Wizard" :breadcrumbs="[{label: 'Dashboard', to: '/dashboard'}, {label: 'Applications'}]" />
    <UCard>
      <div class="mb-8">
        <ul class="flex space-x-4 mb-4 items-center">
          <li v-for="(step, idx) in steps" :key="idx" 
              class="px-4 py-2 rounded-lg text-sm font-medium"
              :class="currentStep === idx ? 'bg-primary-500 text-white shadow-md' : 'bg-gray-100 text-gray-500'">
            Step {{ idx + 1 }}: {{ step }}
          </li>
        </ul>
      </div>

      <form @submit.prevent="saveDraft">
        <div v-show="currentStep === 0" class="space-y-4">
          <UFormGroup label="Organization Scope">
            <UInput v-model="form.scope" placeholder="Enter scope of accreditation" />
          </UFormGroup>
          <UFormGroup label="Assessment Type">
            <USelectMenu v-model="form.assessmentType" :options="['Initial', 'Surveillance', 'Renew']" />
          </UFormGroup>
        </div>

        <div v-show="currentStep === 1" class="space-y-4">
          <UFormGroup label="Select Pre-uploaded Documents">
            <USelectMenu v-model="form.documents" :options="['Company_Registration.pdf', 'Quality_Manual.pdf']" multiple placeholder="Select documents" />
          </UFormGroup>
        </div>

        <div v-show="currentStep === 2" class="space-y-4">
          <UAlert title="Review Application" description="Please review your details before submitting as Draft." color="primary" variant="soft" />
          <pre class="bg-gray-50 dark:bg-gray-800 p-4 rounded mt-4 text-sm font-mono overflow-auto">{{ form }}</pre>
        </div>

        <div class="mt-8 border-t pt-4 flex justify-between items-center">
          <UButton label="Previous" icon="i-heroicons-arrow-left" color="gray" :disabled="currentStep === 0" @click="currentStep--" />
          <div class="flex space-x-2">
            <UButton label="Save as Draft" color="gray" variant="outline" @click="saveDraft" v-if="currentStep < steps.length - 1" />
            <UButton label="Next" icon-right="i-heroicons-arrow-right" color="primary" v-if="currentStep < steps.length - 1" @click="currentStep++" />
            <UButton type="submit" label="Submit Final Output" icon="i-heroicons-paper-airplane" color="green" v-if="currentStep === steps.length - 1" />
          </div>
        </div>
      </form>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import PageHeader from '~/app/components/shared/PageHeader.vue'

const steps = ['Basic Details', 'Documentation', 'Review']
const currentStep = ref(0)
const form = ref({ scope: '', assessmentType: 'Initial', documents: [] })

const saveDraft = async () => {
  // Mock API Call
  alert('Application Saved/Submitted successfully.')
  if (currentStep.value === steps.length - 1) {
     form.value = { scope: '', assessmentType: 'Initial', documents: [] }
     currentStep.value = 0
  }
}
</script>
