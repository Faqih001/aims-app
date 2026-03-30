<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'
import { useAuthStore } from '../../../../stores/auth'

const authStore = useAuthStore()

const schema = z.object({
  organizationName: z.string().min(3),
  registrationNumber: z.string().min(3),
  contactEmail: z.string().email(),
  scope: z.string().min(10),
})

type Schema = z.infer<typeof schema>

const state = reactive({
  organizationName: '',
  registrationNumber: '',
  contactEmail: '',
  scope: '',
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  await $fetch('/api/applications', {
    method: 'POST',
    body: {
      ...event.data,
      applicantId: authStore.user?.id,
    },
  })
  navigateTo('/dashboard/applicant/applications')
}
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold mb-4">New Application</h1>
    <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
      <UFormGroup label="Organization Name" name="organizationName">
        <UInput v-model="state.organizationName" />
      </UFormGroup>
      <UFormGroup label="Registration Number" name="registrationNumber">
        <UInput v-model="state.registrationNumber" />
      </UFormGroup>
      <UFormGroup label="Contact Email" name="contactEmail">
        <UInput v-model="state.contactEmail" />
      </UFormGroup>
      <UFormGroup label="Scope of Accreditation" name="scope">
        <UTextarea v-model="state.scope" />
      </UFormGroup>
      <UButton type="submit">Submit Application</UButton>
    </UForm>
  </div>
</template>