<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'

const route = useRoute()
const applicationId = route.params.id

const schema = z.object({
  recommendation: z.enum(['APPROVED', 'REJECTED']),
  comments: z.string().min(10),
})

type Schema = z.infer<typeof schema>

const state = reactive({
  recommendation: undefined,
  comments: '',
})

const recommendationOptions = [
  { label: 'Approve', value: 'APPROVED' },
  { label: 'Reject', value: 'REJECTED' },
]

async function onSubmit(event: FormSubmitEvent<Schema>) {
  await $fetch(`/api/applications/${applicationId}/assessment`, {
    method: 'POST',
    body: event.data,
  })
  // Optionally, show a success message or navigate away
}
</script>

<template>
  <UCard>
    <template #header>
      <h2 class="text-xl font-semibold">Submit Assessment</h2>
    </template>
    <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
      <UFormGroup label="Recommendation" name="recommendation">
        <USelectMenu v-model="state.recommendation" :options="recommendationOptions" />
      </UFormGroup>
      <UFormGroup label="Comments" name="comments">
        <UTextarea v-model="state.comments" />
      </UFormGroup>
      <UButton type="submit">Submit Assessment</UButton>
    </UForm>
  </UCard>
</template>